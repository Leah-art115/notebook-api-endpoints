import { useState } from "react";
import { addNote } from "../../services/todoService";
import "./CreateNote.css";

function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleAddNote() {
    if (!title.trim() || !content.trim()) return;

    await addNote(title, content);

    setTitle("");
    setContent("");
    alert("Note added successfully!");
  }

  return (
    <div className="create-note-page">
      <h1><i className="fas fa-plus-circle"></i> Create Note</h1>

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
