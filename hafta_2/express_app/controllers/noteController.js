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

const getNote = (req, res) => {
  const noteId = req.params.id;
  const note = noteService.getNoteById(noteId);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  res.status(200).json({
    success: true,
    data: note,
  });
};

const updateNote = (req, res) => {
  const id = req.params.id;
  const content = req.body.content;

  if (!content) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Content is required to update the note!",
      });
  }

  const updatedNote = noteService.updateNote(id, content);

  if (!updatedNote) {
    return res
      .status(404)
      .json({ success: false, message: "Note not found for update!" });
  }

  res.status(200).json({ success: true, data: updatedNote });
};

// YENİ: Silme isteğini karşılayan garson
const deleteNote = (req, res) => {
  const id = req.params.id;
  const isDeleted = noteService.deleteNote(id);

  if (!isDeleted) {
    return res
      .status(404)
      .json({ success: false, message: "Note not found for deletion!" });
  }

  res
    .status(200)
    .json({ success: true, message: "Note deleted successfully!" });
};

module.exports = {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
};
