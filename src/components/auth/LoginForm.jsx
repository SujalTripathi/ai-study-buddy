import React, { useState } from 'react';
import { validateEmail, validatePassword } from '../../utils/validators';

const LoginForm = ({ onSubmit, loading, onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    
    if (!emailValidation.valid || !passwordValidation.valid) {
      setErrors({
        email: emailValidation.error,
        password: passwordValidation.error,
      });
      return;
    }
    
    setErrors({});
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label htmlFor="email" style={styles.label}>
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="your.email@example.com"
          style={errors.email ? {...styles.input, ...styles.inputError} : styles.input}
          required
        />
        {errors.email && <span style={styles.errorText}>{errors.email}</span>}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="password" style={styles.label}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="••••••••"
          style={errors.password ? {...styles.input, ...styles.inputError} : styles.input}
          required
        />
        {errors.password && <span style={styles.errorText}>{errors.password}</span>}
      </div>

      <button type="submit" style={styles.submitButton} disabled={loading}>
        {loading ? '⏳ Signing in...' : '🔐 Sign In'}
      </button>

      <div style={styles.footer}>
        <p style={styles.toggleText}>
          Don't have an account?{' '}
          <button type="button" onClick={onToggleMode} style={styles.toggleButton}>
            Sign up
          </button>
        </p>
      </div>
    </form>
  );
};

const styles = {
  form: { width: '100%' },
  formGroup: { marginBottom: '24px' },
  label: {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: '#2d3748',
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    fontSize: '15px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    outline: 'none',
    transition: 'all 0.2s',
    boxSizing: 'border-box',
  },
  inputError: { borderColor: '#f56565' },
  errorText: {
    display: 'block',
    marginTop: '6px',
    fontSize: '13px',
    color: '#f56565',
  },
  submitButton: {
    width: '100%',
    padding: '16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    marginTop: '24px',
  },
  footer: { marginTop: '24px', textAlign: 'center' },
  toggleText: { fontSize: '14px', color: '#718096', margin: 0 },
  toggleButton: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    fontWeight: '700',
    cursor: 'pointer',
    padding: 0,
    fontSize: '14px',
  },
};

export default LoginForm;
