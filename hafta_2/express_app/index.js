const express = require("express");
const app = express();
const PORT = 3000;

const noteRoutes = require("./routes/noteRoutes");

app.use(express.json());

app.use("/api/notes", noteRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Express server is running perfectly!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
