import { useEffect, useState } from "react";
import { getNotes, deleteNote, updateNote, type Note } from "../../services/todoService";
import "./AllNotes.css";

function AllNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const data = await getNotes();
    setNotes(data);
  }

  async function handleDelete(id: number) {
    await deleteNote(id);
    setNotes(notes.filter((n) => n.id !== id));
  }

  function handleEdit(note: Note) {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
    window.scrollTo({ top: 0, behavior: "smooth" }); // optional: scroll to form
  }

  async function handleUpdate() {
    if (!title.trim() || !content.trim() || editingId === null) return;

    const updated = await updateNote(editingId, title, content);
    setNotes(notes.map((n) => (n.id === editingId ? updated : n)));
    setEditingId(null);
    setTitle("");
    setContent("");
  }

  return (
    <div className="all-notes-page">
      <h1><i className="fas fa-list"></i> All Notes</h1>

      {/* Edit Form (only shows when editing) */}
      {editingId && (
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
          <button onClick={handleUpdate}>
            <i className="fas fa-edit"></i> Update Note
          </button>
        </div>
      )}

      <div className="notes-grid">
        {notes.length === 0 ? (
          <div className="empty-state">
            <i className="fas fa-sticky-note"></i>
            <h3>No notes found</h3>
            <p>Create a note to get started!</p>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="note-card-content">
                <h3>{note.title}</h3>
                <p>{note.content}</p>
              </div>
              <div className="note-actions">
                <button className="edit" onClick={() => handleEdit(note)}>
                  <i className="fas fa-edit"></i> Edit
                </button>
                <button className="delete" onClick={() => handleDelete(note.id)}>
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllNotes;
