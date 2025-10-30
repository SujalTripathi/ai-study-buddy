import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import { APP_NAME, APP_DESCRIPTION } from '../utils/constants';

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const { login, register, loading, checkAuth } = useAuth();

  const handleLogin = async (formData) => {
    const result = await login(formData.email, formData.password);
    if (result.success) {
      // Navigation handled by App.jsx automatically
    } else {
      alert(result.error);
    }
  };

  const handleSignup = async (formData) => {
    const result = await register(formData.email, formData.password, formData.name);
    if (result.success) {
      // Navigation handled by App.jsx automatically
    } else {
      alert(result.error);
    }
  };

  return (
    <div style={styles.container}>
      {/* Animated Background */}
      <div style={styles.background}>
        <div style={styles.circle1}></div>
        <div style={styles.circle2}></div>
        <div style={styles.circle3}></div>
      </div>
      
      {/* Content */}
      <div style={styles.content}>
        {/* Logo and Branding */}
        <div style={styles.brandSection}>
          <div style={styles.logoCircle}>
            <span style={styles.logoIcon}>📚</span>
          </div>
          <h1 style={styles.brandTitle}>{APP_NAME}</h1>
          <p style={styles.brandSubtitle}>{APP_DESCRIPTION}</p>
        </div>

        {/* Form Card */}
        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.cardTitle}>
              {isSignup ? '🚀 Create Account' : '🔐 Welcome Back'}
            </h2>
            <p style={styles.cardSubtitle}>
              {isSignup 
                ? 'Join thousands of students learning smarter' 
                : 'Sign in to continue your learning journey'}
            </p>
          </div>

          {isSignup ? (
            <SignupForm 
              onSubmit={handleSignup}
              loading={loading}
              onToggleMode={() => setIsSignup(false)}
            />
          ) : (
            <LoginForm 
              onSubmit={handleLogin}
              loading={loading}
              onToggleMode={() => setIsSignup(true)}
            />
          )}
        </div>

        {/* Footer */}
        <footer style={styles.footer}>
          <p style={styles.footerText}>
            Built with ❤️ for Appwrite Hacktoberfest 2025
          </p>
        </footer>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    position: 'relative',
    overflow: 'hidden',
  },
  background: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    zIndex: 0,
  },
  circle1: {
    position: 'absolute',
    width: '600px',
    height: '600px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '50%',
    top: '-200px',
    right: '-200px',
    animation: 'float 6s ease-in-out infinite',
  },
  circle2: {
    position: 'absolute',
    width: '400px',
    height: '400px',
    background: 'rgba(255,255,255,0.08)',
    borderRadius: '50%',
    bottom: '-100px',
    left: '-100px',
    animation: 'float 8s ease-in-out infinite',
  },
  circle3: {
    position: 'absolute',
    width: '300px',
    height: '300px',
    background: 'rgba(255,255,255,0.06)',
    borderRadius: '50%',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    animation: 'float 10s ease-in-out infinite',
  },
  content: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 24px',
    position: 'relative',
    zIndex: 1,
    minHeight: '100vh',
  },
  brandSection: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  logoCircle: {
    width: '100px',
    height: '100px',
    margin: '0 auto 24px',
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    animation: 'pulse 2s ease-in-out infinite',
  },
  logoIcon: {
    fontSize: '48px',
  },
  brandTitle: {
    margin: '0 0 12px 0',
    fontSize: '42px',
    fontWeight: '900',
    color: 'white',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
    letterSpacing: '-1px',
  },
  brandSubtitle: {
    margin: 0,
    fontSize: '18px',
    color: 'rgba(255, 255, 255, 0.95)',
    fontWeight: '500',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.98)',
    padding: '48px',
    borderRadius: '24px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '480px',
    backdropFilter: 'blur(10px)',
  },
  cardHeader: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  cardTitle: {
    margin: '0 0 12px 0',
    fontSize: '28px',
    fontWeight: '800',
    color: '#2d3748',
  },
  cardSubtitle: {
    margin: 0,
    fontSize: '15px',
    color: '#718096',
    lineHeight: 1.6,
  },
  footer: {
    marginTop: '32px',
    textAlign: 'center',
  },
  footerText: {
    margin: 0,
    fontSize: '14px',
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
};

// Add animations
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-20px); }
    }
    @keyframes pulse {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.05); }
    }
  `;
  document.head.appendChild(style);
}

export default Login;
