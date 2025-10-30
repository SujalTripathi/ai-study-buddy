/**
 * useNotes Hook
 * Custom hook for notes state management
 */

import { useState, useEffect, useCallback } from 'react';
import notesService from '../services/notes.service';

export const useNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load notes on mount
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedNotes = await notesService.getNotes();
      setNotes(fetchedNotes);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNote = useCallback(async (noteData) => {
    try {
      setLoading(true);
      setError(null);
      const newNote = await notesService.createNote(noteData);
      setNotes(prev => [newNote, ...prev]);
      return { success: true, note: newNote };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateNote = useCallback(async (noteId, updates) => {
    try {
      setLoading(true);
      setError(null);
      const updatedNote = await notesService.updateNote(noteId, updates);
      setNotes(prev => prev.map(note => note.$id === noteId ? updatedNote : note));
      return { success: true, note: updatedNote };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteNote = useCallback(async (noteId) => {
    try {
      setLoading(true);
      setError(null);
      await notesService.deleteNote(noteId);
      setNotes(prev => prev.filter(note => note.$id !== noteId));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const searchNotes = useCallback(async (query) => {
    try {
      setLoading(true);
      setError(null);
      const results = await notesService.searchNotes(query);
      return { success: true, results };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    notes,
    loading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    searchNotes,
  };
};
