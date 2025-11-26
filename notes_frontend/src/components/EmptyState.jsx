import React from "react";

// PUBLIC_INTERFACE
export default function EmptyState({ onAdd }) {
  /** Empty state prompting user to create a note */
  return (
    <div className="empty-state">
      <div className="empty-card">
        <div className="icon">🌊</div>
        <h2>Welcome</h2>
        <p>Create your first note to get started.</p>
        <button className="btn primary" onClick={onAdd}>
          + Create Note
        </button>
      </div>
    </div>
  );
}
