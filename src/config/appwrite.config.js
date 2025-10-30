/**
 * Appwrite Configuration
 * Centralized configuration for Appwrite SDK
 * @module config/appwrite
 */

import { Client, Account, Databases, Storage, Functions, Query } from 'appwrite';

// Environment variables (production best practice)
const config = {
  endpoint: import.meta.env.VITE_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1',
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID || '6901abe1001b09f9e043',
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID || '6901ae750029e7d2f036',
  notesCollectionId: import.meta.env.VITE_APPWRITE_NOTES_COLLECTION_ID || 'study_notes',
  storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID || 'study-materials',
};

// Validate configuration
const validateConfig = () => {
  const requiredKeys = ['endpoint', 'projectId', 'databaseId', 'notesCollectionId'];
  const missing = requiredKeys.filter(key => !config[key]);
  
  if (missing.length > 0) {
    throw new Error(`Missing required configuration: ${missing.join(', ')}`);
  }
};

validateConfig();

// Initialize Appwrite Client
class AppwriteClient {
  constructor() {
    this.client = new Client();
    this.client
      .setEndpoint(config.endpoint)
      .setProject(config.projectId);
    
    // Initialize services
    this.account = new Account(this.client);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
    this.functions = new Functions(this.client);
  }

  // Getter methods for services
  getAccount() {
    return this.account;
  }

  getDatabases() {
    return this.databases;
  }

  getStorage() {
    return this.storage;
  }

  getFunctions() {
    return this.functions;
  }
}

// Export singleton instance
const appwriteClient = new AppwriteClient();

export const account = appwriteClient.getAccount();
export const databases = appwriteClient.getDatabases();
export const storage = appwriteClient.getStorage();
export const functions = appwriteClient.getFunctions();
export { config, Query };
export default appwriteClient;
