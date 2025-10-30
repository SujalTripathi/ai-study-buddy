import React, { useState } from 'react';
import { validateEmail, validatePassword, validateName } from '../../utils/validators';

const SignupForm = ({ onSubmit, loading, onToggleMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    
    const nameValidation = validateName(formData.name);
    const emailValidation = validateEmail(formData.email);
    const passwordValidation = validatePassword(formData.password);
    
    const newErrors = {};
    if (!nameValidation.valid) newErrors.name = nameValidation.error;
    if (!emailValidation.valid) newErrors.email = emailValidation.error;
    if (!passwordValidation.valid) newErrors.password = passwordValidation.error;
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    await onSubmit({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <div style={styles.formGroup}>
        <label htmlFor="name" style={styles.label}>Full Name</label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          style={errors.name ? {...styles.input, ...styles.inputError} : styles.input}
          required
        />
        {errors.name && <span style={styles.errorText}>{errors.name}</span>}
      </div>

      <div style={styles.formGroup}>
        <label htmlFor="email" style={styles.label}>Email Address</label>
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
        <label htmlFor="password" style={styles.label}>Password</label>
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

      <div style={styles.formGroup}>
        <label htmlFor="confirmPassword" style={styles.label}>Confirm Password</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="••••••••"
          style={errors.confirmPassword ? {...styles.input, ...styles.inputError} : styles.input}
          required
        />
        {errors.confirmPassword && <span style={styles.errorText}>{errors.confirmPassword}</span>}
      </div>

      <button type="submit" style={styles.submitButton} disabled={loading}>
        {loading ? '⏳ Creating account...' : '🚀 Create Account'}
      </button>

      <div style={styles.footer}>
        <p style={styles.toggleText}>
          Already have an account?{' '}
          <button type="button" onClick={onToggleMode} style={styles.toggleButton}>
            Sign in
          </button>
        </p>
      </div>
    </form>
  );
};

const styles = {
  form: { width: '100%' },
  formGroup: { marginBottom: '20px' },
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
    marginTop: '16px',
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

export default SignupForm;
