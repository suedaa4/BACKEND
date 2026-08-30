const express = require("express");
const db = require("./db");
require("dotenv").config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");
    res.json({
      message: "Database connection successful!",
      time: result.rows[0].now,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database connection error!" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});
