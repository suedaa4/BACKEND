const noteService = require("../services/noteService");

const getNotes = async (req, res) => {
  try {
    const notes = await noteService.getAllNotes();
    res.status(200).json({
      success: true,
      data: notes,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error while fetching notes" });
  }
};

const createNote = async (req, res) => {
  try {
    const content = req.body.content;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required",
      });
    }

    const addedNote = await noteService.addNote(content);
    res.status(201).json({
      success: true,
      data: addedNote,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error while creating note" });
  }
};

const getNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const note = await noteService.getNoteById(noteId);

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
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error while fetching note" });
  }
};

const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const content = req.body.content;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: "Content is required to update the note!",
      });
    }

    const updatedNote = await noteService.updateNote(id, content);

    if (!updatedNote) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found for update!" });
    }

    res.status(200).json({ success: true, data: updatedNote });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error while updating note" });
  }
};

const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const isDeleted = await noteService.deleteNote(id);

    if (!isDeleted) {
      return res
        .status(404)
        .json({ success: false, message: "Note not found for deletion!" });
    }

    res
      .status(200)
      .json({ success: true, message: "Note deleted successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Server error while deleting note" });
  }
};

module.exports = {
  getNotes,
  createNote,
  getNote,
  updateNote,
  deleteNote,
};
