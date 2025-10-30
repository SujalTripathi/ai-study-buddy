/**
 * Authentication Service
 * Handles all authentication-related operations
 * @module services/auth
 */

import { account } from '../config/appwrite.config';
import { ID } from 'appwrite';

class AuthService {
  /**
   * Register a new user
   * @param {string} email - User email
   * @param {string} password - User password
   * @param {string} name - User name
   * @returns {Promise<Object>} User object
   */
  async register(email, password, name) {
    try {
      const user = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      
      // Automatically log in after registration
      await this.login(email, password);
      return user;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Login user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} Session object
   */
  async login(email, password) {
    try {
      const session = await account.createEmailPasswordSession(email, password);
      return session;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Get current user
   * @returns {Promise<Object|null>} Current user or null
   */
  async getCurrentUser() {
    try {
      const user = await account.get();
      return user;
    } catch (error) {
      // User not logged in
      return null;
    }
  }

  /**
   * Logout current user
   * @returns {Promise<void>}
   */
  async logout() {
    try {
      await account.deleteSession('current');
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Check if user is authenticated
   * @returns {Promise<boolean>}
   */
  async isAuthenticated() {
    try {
      await account.get();
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Handle and format errors
   * @private
   */
  handleError(error) {
    const errorMessages = {
      'user_already_exists': 'An account with this email already exists',
      'invalid_credentials': 'Invalid email or password',
      'user_unauthorized': 'Session expired. Please login again',
    };

    const message = errorMessages[error.type] || error.message || 'An unexpected error occurred';
    return new Error(message);
  }
}

// Export singleton instance
export default new AuthService();
