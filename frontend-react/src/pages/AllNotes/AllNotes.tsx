/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { getNotes, deleteNote, updateNote, type Note } from "../../services/todoService";
import "./AllNotes.css";

function AllNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  // Show notification and auto-hide after 3 seconds
  function showNotification(message: string, type: 'success' | 'error' = 'success') {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }

  async function fetchNotes() {
    const data = await getNotes();
    setNotes(data);
  }

  function handleDeleteClick(id: number) {
    setNoteToDelete(id);
    setShowDeleteModal(true);
  }

  async function confirmDelete() {
    if (noteToDelete === null) return;
    
    try {
      await deleteNote(noteToDelete);
      setNotes(notes.filter((n) => n.id !== noteToDelete));
      showNotification("Note deleted successfully!", "success");
    } catch (error) {
      showNotification("Failed to delete note. Please try again.", "error");
    }
    
    setShowDeleteModal(false);
    setNoteToDelete(null);
  }

  function cancelDelete() {
    setShowDeleteModal(false);
    setNoteToDelete(null);
  }

  function handleEdit(note: Note) {
    setEditingId(note.id);
    setTitle(note.title);
    setContent(note.content);
  }

  function cancelEdit() {
    setEditingId(null);
    setTitle("");
    setContent("");
  }

  async function handleUpdate() {
    if (!title.trim() || !content.trim() || editingId === null) {
      showNotification("Please fill in both title and description", "error");
      return;
    }

    try {
      const updated = await updateNote(editingId, title, content);
      setNotes(notes.map((n) => (n.id === editingId ? updated : n)));
      setEditingId(null);
      setTitle("");
      setContent("");
      showNotification("Note updated successfully!", "success");
    } catch (error) {
      showNotification("Failed to update note. Please try again.", "error");
    }
  }

  return (
    <div className="all-notes-page">
      <h1>
        {/* <i className="fas fa-list"></i>  */}
        All Notes</h1>

      {/* Custom Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          <div className="notification-content">
            <i className={`fas ${notification.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
            <span>{notification.message}</span>
            <button 
              className="notification-close"
              onClick={() => setNotification(null)}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingId && (
        <div className="modal-overlay" onClick={cancelEdit}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2><i className="fas fa-edit"></i> Edit Note</h2>
              <button className="modal-close" onClick={cancelEdit}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
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
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={cancelEdit}>
                Cancel
              </button>
              <button className="btn-primary" onClick={handleUpdate}>
                <i className="fas fa-save"></i> Update Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2><i className="fas fa-exclamation-triangle"></i> Delete Note</h2>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this note? This action cannot be undone.</p>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn-danger" onClick={confirmDelete}>
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
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
                <button className="delete" onClick={() => handleDeleteClick(note.id)}>
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