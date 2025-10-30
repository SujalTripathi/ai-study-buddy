import React, { useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const { user, loading, checkAuth } = useAuth();

  // Recheck auth on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loading
  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading AI Study Buddy...</p>
      </div>
    );
  }

  // Render based on auth state
  return user ? <Dashboard /> : <Login />;
}

const styles = {
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  spinner: {
    width: '56px',
    height: '56px',
    border: '5px solid rgba(255,255,255,0.3)',
    borderTop: '5px solid white',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
  },
  loadingText: {
    marginTop: '24px',
    color: 'white',
    fontSize: '18px',
    fontWeight: '600',
  },
};

export default App;
