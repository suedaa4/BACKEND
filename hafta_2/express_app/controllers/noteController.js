const noteService = require("../services/noteService");

const getNotes = (req, res) => {
  const notes = noteService.getAllNotes();

  res.status(200).json({
    success: true,
    data: notes,
  });
};

module.exports = {
  getNotes,
};
