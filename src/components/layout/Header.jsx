/**
 * Header Component
 * Main application header with navigation
 */

import React from 'react';
import { APP_NAME } from '../../utils/constants';
import theme from '../../styles/theme';

const Header = ({ user, onLogout }) => {
  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <div style={styles.brand}>
          <span style={styles.icon}>📚</span>
          <h1 style={styles.title}>{APP_NAME}</h1>
        </div>
        
        {user && (
          <div style={styles.userSection}>
            <div style={styles.userInfo}>
              <span style={styles.avatar}>
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </span>
              <span style={styles.userName}>{user.name || user.email}</span>
            </div>
            <button onClick={onLogout} style={styles.logoutButton}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

const styles = {
  header: {
    background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.secondary} 100%)`,
    color: theme.colors.text.white,
    boxShadow: theme.shadows.md,
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `${theme.spacing.lg} ${theme.spacing.xl}`,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  icon: {
    fontSize: theme.typography.fontSize.xxl,
  },
  title: {
    margin: 0,
    fontSize: theme.typography.fontSize.xl,
    fontWeight: theme.typography.fontWeight.bold,
  },
  userSection: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  userInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  avatar: {
    width: '40px',
    height: '40px',
    borderRadius: theme.borderRadius.full,
    background: 'rgba(255,255,255,0.2)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: theme.typography.fontWeight.bold,
    fontSize: theme.typography.fontSize.lg,
  },
  userName: {
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
  },
  logoutButton: {
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    background: theme.colors.text.white,
    color: theme.colors.primary,
    border: 'none',
    borderRadius: theme.borderRadius.md,
    fontSize: theme.typography.fontSize.sm,
    fontWeight: theme.typography.fontWeight.semibold,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
  },
};

export default Header;
