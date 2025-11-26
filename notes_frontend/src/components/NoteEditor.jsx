import React, { useEffect, useState } from "react";

// PUBLIC_INTERFACE
export default function NoteEditor({
  note,
  onSave,
  onDelete,
  saving,
  keyHint,
}) {
  /**
   * Editor for a single note (title + content).
   * Performs basic validation, emits onSave with changes.
   */
  const [title, setTitle] = useState(note?.title || "");
  const [content, setContent] = useState(note?.content || "");
  const [error, setError] = useState("");

  useEffect(() => {
    setTitle(note?.title || "");
    setContent(note?.content || "");
    setError("");
  }, [note?.id]);

  const handleSave = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setError("");
    onSave?.({ title: title.trim(), content });
  };

  return (
    <section className="nm-editor" aria-label="Note editor">
      {!note ? null : (
        <>
          <div className="editor-header">
            <input
              className="title-input"
              placeholder="Note title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={255}
            />
            <div className="editor-actions">
              <button
                className="btn danger subtle"
                onClick={() => onDelete?.(note.id, note.title)}
                disabled={saving}
                title="Delete note"
              >
                Delete
              </button>
              <button
                className="btn primary"
                onClick={handleSave}
                disabled={saving}
                title={keyHint}
              >
                {saving ? "Saving…" : "Save"}
              </button>
            </div>
          </div>
          <textarea
            className="content-input"
            placeholder="Write your note here…"
            value={content || ""}
            onChange={(e) => setContent(e.target.value)}
          />
          {error ? <div className="form-error">{error}</div> : null}
        </>
      )}
    </section>
  );
}
