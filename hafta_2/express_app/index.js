const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Express server is running perfectly!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
