/**
 * NoteCard - Cyberpunk Edition
 */

import React from 'react';
import theme from '../../styles/theme';

const NoteCard = ({ note, onDelete, onEdit }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getSubjectColor = (subject) => {
    const colors = {
      'Mathematics': theme.colors.neonBlue,
      'Physics': theme.colors.neonPurple,
      'Chemistry': theme.colors.neonGreen,
      'Biology': theme.colors.neonYellow,
      'Computer Science': theme.colors.neonPink,
    };
    return colors[subject] || theme.colors.neonBlue;
  };

  return (
    <div style={styles.card}>
      {/* Glow Effect */}
      <div style={{
        ...styles.glow,
        background: `radial-gradient(circle at 50% 0%, ${getSubjectColor(note.subject)}22, transparent 70%)`,
      }}></div>

      <div style={styles.header}>
        <h3 style={styles.title}>{note.title}</h3>
        <div style={styles.actions}>
          <button 
            onClick={() => onEdit(note)} 
            style={{...styles.actionBtn, ...styles.editBtn}}
            title="Edit note"
          >
            ✏️
          </button>
          <button 
            onClick={() => onDelete(note.$id)} 
            style={{...styles.actionBtn, ...styles.deleteBtn}}
            title="Delete note"
          >
            🗑️
          </button>
        </div>
      </div>
      
      <div style={styles.meta}>
        <span style={{
          ...styles.subject,
          background: getSubjectColor(note.subject),
        }}>
          {note.subject}
        </span>
        <span style={styles.date}>
          📅 {formatDate(note.$createdAt)}
        </span>
      </div>
      
      <p style={styles.content}>
        {note.content.length > 150 
          ? `${note.content.substring(0, 150)}...` 
          : note.content
        }
      </p>
    </div>
  );
};

const styles = {
  card: {
    position: 'relative',
    background: theme.colors.bgCard,
    padding: '24px',
    borderRadius: '16px',
    border: `2px solid rgba(183, 33, 255, 0.3)`,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  glow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '100px',
    pointerEvents: 'none',
    zIndex: 0,
  },
  header: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
    zIndex: 1,
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: '800',
    color: theme.colors.textPrimary,
    flex: 1,
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  actions: {
    display: 'flex',
    gap: '8px',
  },
  actionBtn: {
    background: 'rgba(255, 255, 255, 0.05)',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
  },
  editBtn: {
    '&:hover': {
      background: 'rgba(0, 217, 255, 0.2)',
    },
  },
  deleteBtn: {
    '&:hover': {
      background: 'rgba(255, 0, 110, 0.2)',
    },
  },
  meta: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
    zIndex: 1,
  },
  subject: {
    padding: '6px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '800',
    color: 'white',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    boxShadow: '0 0 20px currentColor',
  },
  date: {
    fontSize: '12px',
    color: theme.colors.textMuted,
    fontWeight: '600',
  },
  content: {
    position: 'relative',
    margin: 0,
    fontSize: '14px',
    color: theme.colors.textSecondary,
    lineHeight: 1.8,
    zIndex: 1,
  },
};

export default NoteCard;
