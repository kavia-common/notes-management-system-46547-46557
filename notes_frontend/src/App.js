import React, { useEffect, useMemo, useState } from "react";
import "./App.css";
import "./index.css";
import Header from "./components/Header";
import NotesList from "./components/NotesList";
import NoteEditor from "./components/NoteEditor";
import EmptyState from "./components/EmptyState";
import useNotesApi from "./hooks/useNotesApi";
import { getApiBase } from "./api/client";

// PUBLIC_INTERFACE
function App() {
  /**
   * Notes application with two-pane layout.
   * - Sidebar: searchable list with create/delete
   * - Main: editor for selected note
   * Theme tokens in CSS implement Ocean Professional.
   */
  const [theme, setTheme] = useState("light");
  const {
    notes,
    selected,
    selectedId,
    setSelectedId,
    loading,
    saving,
    error,
    query,
    setQuery,
    list,
    create,
    update,
    remove,
  } = useNotesApi();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const keyHint = useMemo(
    () => (navigator.platform?.toLowerCase().includes("mac") ? "⌘S" : "Ctrl+S"),
    []
  );

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        // trigger save if editor mounted
        const saveBtn = document.querySelector(".nm-editor .btn.primary");
        if (saveBtn) saveBtn.click();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleCreate = async () => {
    const title = prompt("Title for the new note:");
    if (!title) return;
    try {
      await create(title, "");
    } catch (e) {
      // handled via hook error state
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete note "${title}"? This cannot be undone.`)) {
      return;
    }
    try {
      await remove(id);
    } catch (e) {
      // handled via hook error state
    }
  };

  const handleSave = async (changes) => {
    if (!selected) return;
    try {
      await update(selected.id, changes);
    } catch (e) {
      // handled via hook error state
    }
  };

  const handleSearchChange = async (value) => {
    setQuery(value);
    await list(value);
  };

  return (
    <div className="app-shell">
      <button
        className="theme-toggle"
        onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        {theme === "light" ? "🌙 Dark" : "☀️ Light"}
      </button>

      <Header onAdd={handleCreate} search={query} onSearchChange={handleSearchChange} />

      <div className="content">
        <NotesList
          notes={notes}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onDelete={handleDelete}
          loading={loading}
        />

        <main className="main">
          <div className="main-toolbar">
            <div className="api-indicator" title={`API: ${getApiBase()}`}>
              API: {getApiBase()}
            </div>
            {error ? <div className="error-banner">Error: {String(error.message || error)}</div> : null}
          </div>
          {!selected ? (
            <EmptyState onAdd={handleCreate} />
          ) : (
            <NoteEditor
              note={selected}
              onSave={handleSave}
              onDelete={handleDelete}
              saving={saving}
              keyHint={`Save (${keyHint})`}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
