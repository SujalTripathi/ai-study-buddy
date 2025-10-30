/**
 * Notes Service
 * Handles all note-related operations
 * @module services/notes
 */

import { databases, config, Query } from '../config/appwrite.config';
import { ID } from 'appwrite';

class NotesService {
  constructor() {
    this.databaseId = config.databaseId;
    this.collectionId = config.notesCollectionId;
  }

  /**
   * Create a new note
   * @param {Object} noteData - Note data
   * @returns {Promise<Object>} Created note
   */
 async createNote({ title, content, subject, tags = [] }) {
  try {
    const note = await databases.createDocument(
      this.databaseId,
      this.collectionId,
      ID.unique(),
      {
        title,
        content,
        subject,
        // Remove createdAt and updatedAt - Appwrite handles these automatically
      }
    );
    return note;
  } catch (error) {
    console.error('Create note error:', error);
    throw this.handleError(error);
  }
}


  /**
   * Get all notes for current user
   * @param {Object} options - Query options
   * @returns {Promise<Array>} Array of notes
   */
  async getNotes({ limit = 100, offset = 0, orderBy = '$createdAt', orderType = 'DESC' } = {}) {
    try {
      const response = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [
          Query.limit(limit),
          Query.offset(offset),
          Query.orderDesc(orderBy),
        ]
      );
      return response.documents;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get a single note by ID
   * @param {string} noteId - Note ID
   * @returns {Promise<Object>} Note object
   */
  async getNote(noteId) {
    try {
      const note = await databases.getDocument(
        this.databaseId,
        this.collectionId,
        noteId
      );
      return note;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Update an existing note
   * @param {string} noteId - Note ID
   * @param {Object} updates - Fields to update
   * @returns {Promise<Object>} Updated note
   */
 async updateNote(noteId, updates) {
  try {
    const note = await databases.updateDocument(
      this.databaseId,
      this.collectionId,
      noteId,
      {
        ...updates,
        // Remove updatedAt - Appwrite handles this
      }
    );
    return note;
  } catch (error) {
    console.error('Update note error:', error);
    throw this.handleError(error);
  }
}


  /**
   * Delete a note
   * @param {string} noteId - Note ID
   * @returns {Promise<void>}
   */
  async deleteNote(noteId) {
    try {
      await databases.deleteDocument(
        this.databaseId,
        this.collectionId,
        noteId
      );
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Search notes by query
   * @param {string} query - Search query
   * @returns {Promise<Array>} Matching notes
   */
  async searchNotes(query) {
    try {
      const response = await databases.listDocuments(
        this.databaseId,
        this.collectionId,
        [
          Query.search('title', query),
          Query.limit(50),
        ]
      );
      return response.documents;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Handle and format errors
   * @private
   */
  handleError(error) {
    const errorMessages = {
      'document_not_found': 'Note not found',
      'document_invalid_structure': 'Invalid note data',
      'general_unauthorized_scope': 'You do not have permission to perform this action',
    };

    const message = errorMessages[error.type] || error.message || 'An unexpected error occurred';
    return new Error(message);
  }
}

// Export singleton instance
export default new NotesService();
