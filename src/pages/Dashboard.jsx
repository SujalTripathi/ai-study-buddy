/**
 * Dashboard - Cyberpunk Edition 🌃⚡
 */

import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNotes } from '../hooks/useNotes';
import NoteForm from '../components/notes/NoteForm';
import NoteCard from '../components/notes/NoteCard';
import theme from '../styles/theme';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { notes, loading, createNote, updateNote, deleteNote } = useNotes();
  const [editingNote, setEditingNote] = useState(null);

  const handleCreateNote = async (noteData) => {
    const result = await createNote(noteData);
    if (result.success) {
      alert('✅ Note created successfully!');
    } else {
      alert('❌ ' + (result.error || 'Failed to create note'));
    }
  };

  const handleUpdateNote = async (noteData) => {
    const result = await updateNote(editingNote.$id, noteData);
    if (result.success) {
      alert('✅ Note updated successfully!');
      setEditingNote(null);
    } else {
      alert('❌ ' + (result.error || 'Failed to update note'));
    }
  };

  const handleDeleteNote = async (noteId) => {
    if (!window.confirm('⚠️ Delete this note permanently?')) return;
    
    const result = await deleteNote(noteId);
    if (result.success) {
      alert('✅ Note deleted!');
    } else {
      alert('❌ ' + (result.error || 'Failed to delete note'));
    }
  };

  const handleLogout = async () => {
    const result = await logout();
    if (result.success) {
      alert('👋 Logged out successfully!');
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.bgAnimation}></div>
      
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <span style={styles.logoIcon}>⚡</span>
            <h1 style={styles.logoText}>AI Study Buddy</h1>
          </div>
          
          <div style={styles.userSection}>
            <div style={styles.userInfo}>
              <div style={styles.avatar}>
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span style={styles.userName}>{user?.name || user?.email}</span>
            </div>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              🚪 Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={styles.main}>
        <div style={styles.grid}>
          {/* Left: Form */}
          <aside style={styles.sidebar}>
            <div style={styles.formCard}>
              <div style={styles.formHeader}>
                <span style={styles.formIcon}>✍️</span>
                <h2 style={styles.formTitle}>
                  {editingNote ? 'Edit Note' : 'Create New Note'}
                </h2>
              </div>
              
              <NoteForm 
                onSubmit={editingNote ? handleUpdateNote : handleCreateNote}
                initialData={editingNote}
                loading={loading}
              />
              
              {editingNote && (
                <button 
                  onClick={() => setEditingNote(null)}
                  style={styles.cancelBtn}
                >
                  ❌ Cancel
                </button>
              )}
            </div>
          </aside>

          {/* Right: Notes */}
          <section style={styles.notesSection}>
            {/* Stats Header */}
            <div style={styles.statsHeader}>
              <div>
                <h2 style={styles.sectionTitle}>📚 Your Notes</h2>
                <p style={styles.sectionSubtitle}>
                  Your digital brain for smarter learning
                </p>
              </div>
              <div style={styles.statsCard}>
                <div style={styles.statsNumber}>{notes.length}</div>
                <div style={styles.statsLabel}>TOTAL</div>
              </div>
            </div>

            {/* Notes Grid */}
            {loading && notes.length === 0 ? (
              <div style={styles.loading}>
                <div style={styles.spinner}></div>
                <p style={styles.loadingText}>Loading notes...</p>
              </div>
            ) : notes.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIcon}>🚀</div>
                <h3 style={styles.emptyTitle}>No Notes Yet</h3>
                <p style={styles.emptyText}>
                  Start your learning journey by creating your first note!
                </p>
              </div>
            ) : (
              <div style={styles.notesList}>
                {notes.map(note => (
                  <NoteCard
                    key={note.$id}
                    note={note}
                    onDelete={handleDeleteNote}
                    onEdit={setEditingNote}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    height: '100vh',
    background: theme.colors.bgDark,
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },
  bgAnimation: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 20% 50%, rgba(255, 0, 110, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(183, 33, 255, 0.15) 0%, transparent 50%),
      radial-gradient(circle at 40% 20%, rgba(0, 217, 255, 0.15) 0%, transparent 50%)
    `,
    animation: 'pulse 10s ease-in-out infinite',
    zIndex: 0,
  },
  header: {
    background: theme.colors.bgCard,
    borderBottom: `3px solid ${theme.colors.neonPink}`,
    boxShadow: theme.shadows.neon,
    position: 'sticky',
    top: 0,
    zIndex: 100,
    flexShrink: 0,
  },
  headerContent: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: '24px 40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  logoIcon: {
    fontSize: '40px',
    filter: 'drop-shadow(0 0 15px rgba(255, 0, 110, 1))',
  },
  logoText: {
    margin: 0,
    fontSize: '32px',
    fontWeight: '900',
    background: theme.gradients.primary,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textTransform: 'uppercase',
    letterSpacing: '3px',
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  avatar: {
    width: '52px',
    height: '52px',
    borderRadius: '14px',
    background: theme.gradients.button,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '22px',
    fontWeight: 'bold',
    color: 'white',
    boxShadow: theme.shadows.neon,
  },
  userName: {
    color: theme.colors.textPrimary,
    fontSize: '18px',
    fontWeight: '700',
  },
  logoutBtn: {
    padding: '14px 28px',
    background: 'rgba(255, 0, 110, 0.1)',
    border: `2px solid ${theme.colors.neonPink}`,
    borderRadius: '12px',
    color: theme.colors.neonPink,
    fontSize: '15px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  main: {
    flex: 1,
    overflow: 'auto',
    position: 'relative',
    zIndex: 1,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: '480px 1fr',
    gap: '40px',
    padding: '40px',
    maxWidth: '100%',
    height: '100%',
  },
  sidebar: {
    height: 'fit-content',
    position: 'sticky',
    top: '40px',
  },
  formCard: {
    background: theme.colors.bgCard,
    border: `3px solid ${theme.colors.neonPurple}`,
    borderRadius: '24px',
    padding: '36px',
    boxShadow: `${theme.shadows.card}, inset 0 0 80px rgba(183, 33, 255, 0.08)`,
  },
  formHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    marginBottom: '32px',
    paddingBottom: '20px',
    borderBottom: `2px solid rgba(183, 33, 255, 0.3)`,
  },
  formIcon: {
    fontSize: '32px',
    filter: 'drop-shadow(0 0 12px rgba(183, 33, 255, 1))',
  },
  formTitle: {
    margin: 0,
    fontSize: '26px',
    fontWeight: '900',
    color: theme.colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  cancelBtn: {
    width: '100%',
    marginTop: '20px',
    padding: '16px',
    background: 'rgba(255, 0, 110, 0.15)',
    border: `2px solid ${theme.colors.neonPink}`,
    borderRadius: '12px',
    color: theme.colors.neonPink,
    fontSize: '15px',
    fontWeight: '800',
    cursor: 'pointer',
    textTransform: 'uppercase',
  },
  notesSection: {
    height: 'fit-content',
    minHeight: '500px',
  },
  statsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '40px',
    padding: '36px 40px',
    background: theme.colors.bgCard,
    border: `3px solid ${theme.colors.neonBlue}`,
    borderRadius: '24px',
    boxShadow: theme.shadows.intense,
  },
  sectionTitle: {
    margin: '0 0 12px 0',
    fontSize: '36px',
    fontWeight: '900',
    color: theme.colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: '3px',
  },
  sectionSubtitle: {
    margin: 0,
    fontSize: '16px',
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  statsCard: {
    padding: '28px 40px',
    background: theme.gradients.button,
    borderRadius: '20px',
    textAlign: 'center',
    boxShadow: theme.shadows.neon,
    minWidth: '140px',
  },
  statsNumber: {
    fontSize: '56px',
    fontWeight: '900',
    color: 'white',
    lineHeight: 1,
    textShadow: '0 0 30px rgba(255, 255, 255, 0.8)',
  },
  statsLabel: {
    marginTop: '12px',
    fontSize: '13px',
    fontWeight: '800',
    color: 'rgba(255,255,255,0.95)',
    letterSpacing: '3px',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '100px',
    background: theme.colors.bgCard,
    borderRadius: '24px',
    border: `3px dashed ${theme.colors.neonPurple}`,
  },
  spinner: {
    width: '70px',
    height: '70px',
    border: `5px solid rgba(183, 33, 255, 0.2)`,
    borderTop: `5px solid ${theme.colors.neonPurple}`,
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: {
    marginTop: '28px',
    color: theme.colors.textSecondary,
    fontSize: '18px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '120px 60px',
    background: theme.colors.bgCard,
    borderRadius: '24px',
    border: `3px dashed ${theme.colors.neonGreen}`,
  },
  emptyIcon: {
    fontSize: '120px',
    marginBottom: '32px',
    filter: 'drop-shadow(0 0 30px rgba(6, 255, 165, 0.8))',
  },
  emptyTitle: {
    margin: '0 0 16px 0',
    fontSize: '36px',
    fontWeight: '900',
    color: theme.colors.textPrimary,
    textTransform: 'uppercase',
    letterSpacing: '2px',
  },
  emptyText: {
    margin: 0,
    fontSize: '18px',
    color: theme.colors.textSecondary,
    textAlign: 'center',
    maxWidth: '500px',
    lineHeight: 1.8,
  },
  notesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
    gap: '28px',
  },
};

export default Dashboard;
