/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
          text: {
            primary: '#1e293b',
            secondary: '#64748b',
          },
        },
        dark: {
          bg: '#111827',
          card: '#1f2937',
          input: '#374151',
          border: '#4b5563',
          text: {
            primary: '#f3f4f6',
            secondary: '#d1d5db',
          },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.6s ease-out forwards',
        shake: 'shake 0.5s ease-in-out',
        float: 'float 6s ease-in-out infinite',
      },
      boxShadow: {
        'light': '0 1px 3px rgba(0, 0, 0, 0.05)',
        'light-hover': '0 4px 6px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};