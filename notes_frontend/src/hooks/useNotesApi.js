import { useCallback, useEffect, useMemo, useState } from "react";
import { notesApi } from "../api/client";

// PUBLIC_INTERFACE
export function useNotesApi(initialQuery = "") {
  /**
   * Hook to manage notes CRUD with loading/error state.
   * Provides: notes, selected, loading, error, search text, and CRUD handlers.
   */
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(initialQuery);

  const selected = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const list = useCallback(
    async (q = query) => {
      setLoading(true);
      setError(null);
      try {
        const data = await notesApi.list({ q, limit: 500 });
        setNotes(data);
        // If selected note no longer exists, clear selection
        if (selectedId && !data.some((n) => n.id === selectedId)) {
          setSelectedId(null);
        }
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    },
    [query, selectedId]
  );

  const create = useCallback(async (title, content = "") => {
    if (!title || !title.trim()) {
      throw new Error("Title is required");
    }
    setSaving(true);
    setError(null);
    try {
      const newNote = await notesApi.create({ title: title.trim(), content });
      setNotes((prev) => [newNote, ...prev]);
      setSelectedId(newNote.id);
      return newNote;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setSaving(false);
    }
  }, []);

  const update = useCallback(async (id, payload) => {
    setSaving(true);
    setError(null);
    try {
      const updated = await notesApi.update(id, payload);
      setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
      return updated;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setSaving(false);
    }
  }, []);

  const remove = useCallback(async (id) => {
    setSaving(true);
    setError(null);
    try {
      await notesApi.remove(id);
      setNotes((prev) => prev.filter((n) => n.id !== id));
      if (selectedId === id) setSelectedId(null);
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setSaving(false);
    }
  }, [selectedId]);

  useEffect(() => {
    list();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
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
  };
}

export default useNotesApi;
