import React from "react";

// PUBLIC_INTERFACE
export default function Header({ onAdd, search, onSearchChange }) {
  /** App header with brand, search box, and new-note button. */
  return (
    <header className="nm-header" role="banner">
      <div className="brand">
        <div className="logo">📝</div>
        <div className="titles">
          <h1 className="app-title">Notes</h1>
          <span className="app-subtitle">Ocean Professional</span>
        </div>
      </div>
      <div className="actions">
        <div className="search-wrap">
          <input
            aria-label="Search notes"
            type="search"
            className="search"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
          />
        </div>
        <button className="btn primary" onClick={onAdd}>
          + New
        </button>
      </div>
    </header>
  );
}
