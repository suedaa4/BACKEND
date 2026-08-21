let notes = [
  { id: 1, content: "Learn Express.js" },
  { id: 2, content: "Master Layered Architecture" },
];

const getAllNotes = () => {
  return notes;
};

const addNote = (newContent) => {
  const newNote = {
    id: notes.length + 1,
    content: newContent,
  };
  notes.push(newNote);
  return newNote;
};

const getNoteById = (id) => {
  return notes.find((note) => note.id === parseInt(id));
};

const updateNote = (id, newContent) => {
  const noteIndex = notes.findIndex((note) => note.id === parseInt(id));
  if (noteIndex === -1) return null;

  notes[noteIndex].content = newContent;
  return notes[noteIndex];
};

const deleteNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === parseInt(id));
  if (noteIndex === -1) return false;

  notes.splice(noteIndex, 1);
  return true;
};

module.exports = {
  getAllNotes,
  addNote,
  getNoteById,
  updateNote,
  deleteNote,
};
