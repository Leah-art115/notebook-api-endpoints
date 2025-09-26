/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { addNote } from "../../services/todoService";
import "./CreateNote.css";

type Notification = { message: string; type: 'success' | 'error' } | null;

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notification, setNotification] = useState<Notification>(null);

  // Show notification and auto-hide after 3 seconds
  function showNotification(message: string, type: 'success' | 'error' = 'success') {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }

  async function handleAddNote() {
    if (!title.trim() || !content.trim()) {
      showNotification("Please fill in both title and description", "error");
      return;
    }

    try {
      await addNote(title, content);
      setTitle("");
      setContent("");
      showNotification("Note added successfully!", "success");
    } catch (error) {
      showNotification("Failed to add note. Please try again.", "error");
    }
  }

  return (
    <div className="create-note-page">
      <h1><i className="fas fa-plus-circle"></i> Create Note</h1>

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
        <button onClick={handleAddNote}>
          <i className="fas fa-plus"></i> Add Note
        </button>
      </div>
    </div>
  );
}

export default CreateNote;