/**
 * Cyberpunk/Neon Theme Configuration
 */

export const theme = {
  colors: {
    // Neon Colors
    neonPink: '#ff006e',
    neonBlue: '#00d9ff',
    neonPurple: '#b721ff',
    neonGreen: '#06ffa5',
    neonYellow: '#ffbe0b',
    
    // Dark Background
    bgDark: '#0a0e27',
    bgCard: '#151932',
    bgHover: '#1e2341',
    
    // Text
    textPrimary: '#ffffff',
    textSecondary: '#a0aec0',
    textMuted: '#718096',
    
    // Accents
    success: '#06ffa5',
    error: '#ff006e',
    warning: '#ffbe0b',
    info: '#00d9ff',
  },
  
  gradients: {
    primary: 'linear-gradient(135deg, #ff006e 0%, #b721ff 50%, #00d9ff 100%)',
    card: 'linear-gradient(135deg, #151932 0%, #1e2341 100%)',
    button: 'linear-gradient(135deg, #ff006e 0%, #b721ff 100%)',
    neon: 'linear-gradient(90deg, #00d9ff 0%, #06ffa5 50%, #ffbe0b 100%)',
  },
  
  shadows: {
    neon: '0 0 20px rgba(255, 0, 110, 0.5), 0 0 40px rgba(183, 33, 255, 0.3)',
    card: '0 8px 32px rgba(0, 0, 0, 0.5), 0 0 80px rgba(183, 33, 255, 0.1)',
    intense: '0 0 30px rgba(0, 217, 255, 0.6), 0 0 60px rgba(6, 255, 165, 0.4)',
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    xxl: '48px',
  },
  
  borderRadius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    full: '9999px',
  },
  
  typography: {
    fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '20px',
      xl: '28px',
      xxl: '40px',
    },
  },
};

export default theme;
