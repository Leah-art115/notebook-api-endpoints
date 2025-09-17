import { useEffect, useState } from "react";
import { getNotes, addNote, updateNote, deleteNote, type Note } from "../services/todoService";
import "./NotesApp.css";

function NotesApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  // Load notes from backend
  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const data = await getNotes();
    setNotes(data);
  }

  async function handleAddOrUpdate() {
    if (!title.trim() || !content.trim()) return;

    if (editingId) {
      const updated = await updateNote(editingId, title, content);
      setNotes(notes.map((n) => (n.id === editingId ? updated : n)));
      setEditingId(null);
    } else {
      const created = await addNote(title, content);
      setNotes([...notes, created]);
    }

    setTitle("");
    setContent("");
  }

  async function handleDelete(id: number) {
    await deleteNote(id);
    setNotes(notes.filter((n) => n.id !== id));
  }

  function handleEdit(note: Note) {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
  }

  return (
    <div className="notes-app">
      <h1><i className="fas fa-sticky-note"></i> My Notes</h1>

      <div className="note-form">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>
          {editingId ? (
            <>
              <i className="fas fa-edit"></i> Update Note
            </>
          ) : (
            <>
              <i className="fas fa-plus"></i> Add Note
            </>
          )}
        </button>
      </div>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <div className="note-actions">
              <button className="edit" onClick={() => handleEdit(note)}>
                <i className="fas fa-edit"></i> Edit
              </button>
              <button className="delete" onClick={() => handleDelete(note.id)}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesApp;
