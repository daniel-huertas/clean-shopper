/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
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
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        display: ['48px', { lineHeight: '1.1', letterSpacing: '-1.5px', fontWeight: '700' }],
        h1: ['36px', { lineHeight: '1.2', letterSpacing: '-1px', fontWeight: '700' }],
        h2: ['28px', { lineHeight: '1.3', letterSpacing: '-0.5px', fontWeight: '600' }],
        h3: ['22px', { lineHeight: '1.35', letterSpacing: '0', fontWeight: '600' }],
        h4: ['18px', { lineHeight: '1.4', letterSpacing: '0', fontWeight: '600' }],
        body: ['16px', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        small: ['14px', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
        micro: ['12px', { lineHeight: '1.5', letterSpacing: '0', fontWeight: '400' }],
      },
      spacing: {
        'space-xs': '4px',
        'space-sm': '8px',
        'space-md': '16px',
        'space-lg': '24px',
        'space-xl': '40px',
        'space-2xl': '64px',
        'space-3xl': '96px',
        'space-4xl': '128px',
      },
      borderRadius: {
        'radius-sm': '4px',
        'radius-md': '8px',
        'radius-lg': '12px',
        'radius-full': '9999px',
      },
      boxShadow: {
        'shadow-sm': '0 1px 2px rgba(26, 26, 26, 0.04)',
        'shadow-md': '0 4px 12px rgba(26, 26, 26, 0.08)',
        'shadow-lg': '0 12px 32px rgba(26, 26, 26, 0.12)',
      },
    },
  },
  plugins: [],
};
