import React from "react";

// PUBLIC_INTERFACE
export default function NotesList({
  notes,
  selectedId,
  onSelect,
  onDelete,
  loading,
}) {
  /** Sidebar list of notes with selection and delete button */
  return (
    <aside className="nm-sidebar" aria-label="Notes list">
      {loading ? (
        <div className="state muted">Loading notes…</div>
      ) : notes.length === 0 ? (
        <div className="state">No notes yet</div>
      ) : (
        <ul className="note-items">
          {notes.map((n) => (
            <li
              key={n.id}
              className={`note-item ${selectedId === n.id ? "active" : ""}`}
            >
              <button
                className="note-select"
                onClick={() => onSelect(n.id)}
                title={n.title}
                aria-current={selectedId === n.id ? "true" : "false"}
              >
                <div className="note-title">{n.title}</div>
                <div className="note-meta">
                  {new Date(n.updated_at || n.created_at).toLocaleString()}
                </div>
              </button>
              <button
                className="icon danger"
                title="Delete note"
                onClick={() => onDelete(n.id, n.title)}
                aria-label={`Delete note ${n.title}`}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
