const noteService = require("../services/noteService");

const getNotes = (req, res) => {
  const notes = noteService.getAllNotes();

  res.status(200).json({
    success: true,
    data: notes,
  });
};

const createNote = (req, res) => {
  const content = req.body.content;

  if (!content) {
    return res.status(400).json({
      success: false,
      message: "Content is required",
    });
  }

  const addedNote = noteService.addNote(content);

  res.status(201).json({
    success: true,
    data: addedNote,
  });
};

module.exports = {
  getNotes,
  createNote,
};
