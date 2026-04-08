/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        accent: {
          DEFAULT: '#4ADE80',
          light: '#86EFAC',
          dark: '#16A34A',
          glow: '#22C55E',
        },
        dark: {
          DEFAULT: '#0a0a0a',
          50: '#171717',
          100: '#1a1a1a',
          200: '#1f1f1f',
          300: '#262626',
          400: '#2a2a2a',
          500: '#333333',
          600: '#404040',
          700: '#525252',
          800: '#737373',
          900: '#a3a3a3',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(74, 222, 128, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(74, 222, 128, 0.03) 1px, transparent 1px)',
        'glow-gradient': 'radial-gradient(ellipse at center, rgba(74, 222, 128, 0.15) 0%, transparent 70%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'spin-slow': 'spin 8s linear infinite',
        'gradient-x': 'gradientX 3s ease infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(74, 222, 128, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(74, 222, 128, 0.6)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        blob: {
          '0%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
          '100%': { transform: 'translate(0px, 0px) scale(1)' },
        },
      },
      boxShadow: {
        'glow': '0 0 20px rgba(74, 222, 128, 0.3)',
        'glow-lg': '0 0 40px rgba(74, 222, 128, 0.4)',
        'glow-xl': '0 0 60px rgba(74, 222, 128, 0.5)',
        'inner-glow': 'inset 0 0 20px rgba(74, 222, 128, 0.1)',
      },
    },
  },
  plugins: [],
};
