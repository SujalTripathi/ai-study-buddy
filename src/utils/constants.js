/**
 * Application Constants
 * Centralized constants for the application
 */

export const APP_NAME = 'AI Study Buddy';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'Your intelligent learning companion';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  NOTES: '/notes',
  PROFILE: '/profile',
};

export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_MIN_LENGTH: 8,
  NAME_MIN_LENGTH: 2,
  TITLE_MAX_LENGTH: 100,
  CONTENT_MAX_LENGTH: 10000,
};

export const MESSAGES = {
  SUCCESS: {
    LOGIN: 'Successfully logged in!',
    LOGOUT: 'Successfully logged out!',
    REGISTER: 'Account created successfully!',
    NOTE_CREATED: 'Note created successfully!',
    NOTE_UPDATED: 'Note updated successfully!',
    NOTE_DELETED: 'Note deleted successfully!',
  },
  ERROR: {
    GENERIC: 'Something went wrong. Please try again.',
    NETWORK: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'Please log in to continue.',
  },
};

export const SUBJECTS = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English',
  'History',
  'Geography',
  'Economics',
  'Other',
];
