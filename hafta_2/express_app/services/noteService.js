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

module.exports = {
  getAllNotes,
  addNote,
};
