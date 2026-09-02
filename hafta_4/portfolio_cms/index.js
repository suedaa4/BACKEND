const express = require("express");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: "Too many requests from this IP, please try again after 15 minutes",
  },
});

app.use(limiter);

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const app = express();
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const PORT = process.env.PORT || 3000;

app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const newUser = await pool.query(
      "INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, created_at",
      [username, passwordHash],
    );

    res.status(201).json({
      message: "Admin user registered successfully",
      user: newUser.rows[0],
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error during registration" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const userResult = await pool.query(
      "SELECT * FROM users WHERE username = $1",
      [username],
    );
    if (userResult.rows.length === 0) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const user = userResult.rows[0];

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error during login" });
  }
});

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or expired token" });
  }
};

app.get("/api/admin/dashboard", verifyToken, (req, res) => {
  res.json({
    message: "Welcome to the protected admin dashboard!",
    user: req.user,
  });
});

app.get("/api/projects", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const offset = (page - 1) * limit;

    const allProjects = await pool.query(
      "SELECT * FROM projects ORDER BY created_at DESC LIMIT $1 OFFSET $2",
      [limit, offset],
    );

    const countResult = await pool.query("SELECT COUNT(*) FROM projects");
    const totalProjects = parseInt(countResult.rows[0].count);

    res.json({
      totalProjects,
      totalPages: Math.ceil(totalProjects / limit),
      currentPage: page,
      projects: allProjects.rows,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error while fetching projects" });
  }
});

app.post(
  "/api/projects",
  verifyToken,
  upload.single("image"),
  async (req, res) => {
    try {
      const { title, description, github_url } = req.body;
      const image_url = req.file ? `/uploads/${req.file.filename}` : null;

      const newProject = await pool.query(
        "INSERT INTO projects (title, description, image_url, github_url) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, description, image_url, github_url],
      );

      res.status(201).json({
        message: "Project added successfully with image",
        project: newProject.rows[0],
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: "Server error while adding project" });
    }
  },
);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
