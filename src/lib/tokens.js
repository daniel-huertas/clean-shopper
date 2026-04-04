const tokens = {
  colors: {
    primary: {
      DEFAULT: '#1A1A1A',
      light: '#2D2D2D',
      dark: '#0D0D0D',
    },
    secondary: '#F5F4F1',
    accent: {
      DEFAULT: '#00DDC0',
      dark: '#00C4AA',
    },
    success: '#34D399',
    warning: '#FBBF24',
    error: '#EF4444',
    neutral: {
      50: '#FAFAF8',
      100: '#F5F4F1',
      200: '#E8E6E1',
      400: '#A8A49E',
      600: '#6B6660',
      900: '#1A1A1A',
    },
  },

  typography: {
    fontFamily: '"Space Grotesk", system-ui, sans-serif',
    scale: {
      display: { size: '48px', weight: '700', lineHeight: '1.1', letterSpacing: '-1.5px' },
      h1: { size: '36px', weight: '700', lineHeight: '1.2', letterSpacing: '-1px' },
      h2: { size: '28px', weight: '600', lineHeight: '1.3', letterSpacing: '-0.5px' },
      h3: { size: '22px', weight: '600', lineHeight: '1.35', letterSpacing: '0' },
      h4: { size: '18px', weight: '600', lineHeight: '1.4', letterSpacing: '0' },
      body: { size: '16px', weight: '400', lineHeight: '1.6', letterSpacing: '0' },
      small: { size: '14px', weight: '400', lineHeight: '1.5', letterSpacing: '0' },
      micro: { size: '12px', weight: '400', lineHeight: '1.5', letterSpacing: '0' },
    },
  },

  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '40px',
    '2xl': '64px',
    '3xl': '96px',
    '4xl': '128px',
  },

  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    full: '9999px',
  },

  shadows: {
    sm: '0 1px 2px rgba(26, 26, 26, 0.04)',
    md: '0 4px 12px rgba(26, 26, 26, 0.08)',
    lg: '0 12px 32px rgba(26, 26, 26, 0.12)',
  },
};

export default tokens;
