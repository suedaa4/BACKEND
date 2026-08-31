const express = require("express");
const pool = require("./db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
