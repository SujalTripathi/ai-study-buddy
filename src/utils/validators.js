/**
 * Validation Utilities
 * Input validation functions
 */

import { VALIDATION } from './constants';

export const validateEmail = (email) => {
  if (!email) {
    return { valid: false, error: 'Email is required' };
  }
  
  if (!VALIDATION.EMAIL_REGEX.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  return { valid: true };
};

export const validatePassword = (password) => {
  if (!password) {
    return { valid: false, error: 'Password is required' };
  }
  
  if (password.length < VALIDATION.PASSWORD_MIN_LENGTH) {
    return { 
      valid: false, 
      error: `Password must be at least ${VALIDATION.PASSWORD_MIN_LENGTH} characters` 
    };
  }
  
  return { valid: true };
};

export const validateName = (name) => {
  if (!name) {
    return { valid: false, error: 'Name is required' };
  }
  
  if (name.length < VALIDATION.NAME_MIN_LENGTH) {
    return { 
      valid: false, 
      error: `Name must be at least ${VALIDATION.NAME_MIN_LENGTH} characters` 
    };
  }
  
  return { valid: true };
};

export const validateNote = ({ title, content, subject }) => {
  if (!title || title.trim().length === 0) {
    return { valid: false, error: 'Title is required' };
  }
  
  if (title.length > VALIDATION.TITLE_MAX_LENGTH) {
    return { 
      valid: false, 
      error: `Title must be less than ${VALIDATION.TITLE_MAX_LENGTH} characters` 
    };
  }
  
  if (!content || content.trim().length === 0) {
    return { valid: false, error: 'Content is required' };
  }
  
  if (content.length > VALIDATION.CONTENT_MAX_LENGTH) {
    return { 
      valid: false, 
      error: `Content must be less than ${VALIDATION.CONTENT_MAX_LENGTH} characters` 
    };
  }
  
  if (!subject || subject.trim().length === 0) {
    return { valid: false, error: 'Subject is required' };
  }
  
  return { valid: true };
};
