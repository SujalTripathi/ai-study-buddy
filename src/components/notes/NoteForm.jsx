/**
 * NoteForm - Cyberpunk Edition
 */

import React, { useState } from 'react';
import { validateNote } from '../../utils/validators';
import { SUBJECTS } from '../../utils/constants';
import theme from '../../styles/theme';

const NoteForm = ({ onSubmit, initialData = null, loading = false }) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    subject: initialData?.subject || '',
  });
  
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateNote(formData);
    if (!validation.valid) {
      setErrors({ general: validation.error });
      return;
    }
    
    setErrors({});
    await onSubmit(formData);
    
    if (!initialData) {
      setFormData({ title: '', content: '', subject: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      {errors.general && (
        <div style={styles.errorBanner}>⚠️ {errors.general}</div>
      )}
      
      <div style={styles.formGroup}>
        <label htmlFor="title" style={styles.label}>
          <span style={styles.labelIcon}>📝</span>
          Title *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter note title"
          style={styles.input}
          required
        />
      </div>
      
      <div style={styles.formGroup}>
        <label htmlFor="subject" style={styles.label}>
          <span style={styles.labelIcon}>🎯</span>
          Subject *
        </label>
        <select
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          style={styles.select}
          required
        >
          <option value="">Select a subject</option>
          {SUBJECTS.map(subject => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </div>
      
      <div style={styles.formGroup}>
        <label htmlFor="content" style={styles.label}>
          <span style={styles.labelIcon}>✍️</span>
          Content *
        </label>
        <textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder="Write your notes here..."
          style={styles.textarea}
          rows={8}
          required
        />
        <div style={styles.charCount}>
          {formData.content.length} / 10000
        </div>
      </div>
      
      <button 
        type="submit" 
        style={styles.submitButton}
        disabled={loading}
      >
        {loading ? (
          <>⏳ Saving...</>
        ) : (
          initialData ? '💾 Update Note' : '➕ Create Note'
        )}
      </button>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  errorBanner: {
    padding: '12px 16px',
    background: 'rgba(255, 0, 110, 0.1)',
    border: `2px solid ${theme.colors.neonPink}`,
    borderRadius: '12px',
    color: theme.colors.neonPink,
    fontSize: '14px',
    fontWeight: '600',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '700',
    color: theme.colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: '1px',
  },
  labelIcon: {
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    background: 'rgba(10, 14, 39, 0.6)',
    border: `2px solid rgba(183, 33, 255, 0.3)`,
    borderRadius: '12px',
    color: theme.colors.textPrimary,
    outline: 'none',
    transition: 'all 0.3s ease',
    boxSizing: 'border-box',
  },
  select: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    background: 'rgba(10, 14, 39, 0.6)',
    border: `2px solid rgba(183, 33, 255, 0.3)`,
    borderRadius: '12px',
    color: theme.colors.textPrimary,
    outline: 'none',
    cursor: 'pointer',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    background: 'rgba(10, 14, 39, 0.6)',
    border: `2px solid rgba(183, 33, 255, 0.3)`,
    borderRadius: '12px',
    color: theme.colors.textPrimary,
    outline: 'none',
    resize: 'vertical',
    fontFamily: theme.typography.fontFamily,
    boxSizing: 'border-box',
    minHeight: '200px',
  },
  charCount: {
    fontSize: '12px',
    color: theme.colors.textMuted,
    textAlign: 'right',
  },
  submitButton: {
    width: '100%',
    padding: '16px',
    background: theme.gradients.button,
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '800',
    cursor: 'pointer',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: theme.shadows.neon,
    transition: 'all 0.3s ease',
  },
};

export default NoteForm;
