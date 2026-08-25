const pool = require("../db");

const getAllNotes = async () => {
  try {
    const result = await pool.query("SELECT * FROM notes ORDER BY id ASC");
    return result.rows;
  } catch (err) {
    console.error("Error fetching notes:", err.message);
    throw err;
  }
};

const getNoteById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
    return result.rows[0]; // Returns the single note or undefined if not found
  } catch (err) {
    console.error("Error fetching note by ID:", err.message);
    throw err;
  }
};

const addNote = async (content) => {
  try {
    const result = await pool.query(
      "INSERT INTO notes (content) VALUES ($1) RETURNING *",
      [content],
    );
    return result.rows[0];
  } catch (err) {
    console.error("Error creating note:", err.message);
    throw err;
  }
};

const updateNote = async (id, content) => {
  try {
    const result = await pool.query(
      "UPDATE notes SET content = $1 WHERE id = $2 RETURNING *",
      [content, id],
    );
    return result.rows[0];
  } catch (err) {
    console.error("Error updating note:", err.message);
    throw err;
  }
};

const deleteNote = async (id) => {
  try {
    const result = await pool.query(
      "DELETE FROM notes WHERE id = $1 RETURNING *",
      [id],
    );
    return result.rowCount > 0; // Returns true if a row was successfully deleted
  } catch (err) {
    console.error("Error deleting note:", err.message);
    throw err;
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  addNote,
  updateNote,
  deleteNote,
};
