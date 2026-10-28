/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          light: '#F5F3EE',
          dark: '#0D0D0F',
          subtle: '#EDEAE3',
          card: '#FFFFFF',
          darkCard: '#151518',
          darkSurface: '#1D1D22'
        },
        editorial: {
          primary: '#171717',
          secondary: '#66645F',
          muted: '#8C8983',
          border: '#D8D4CC',
          darkText: '#EDEDED',
          darkMuted: '#9B9B9E',
          darkBorder: '#27272C'
        },
        cinema: {
          accent: '#B84A3A',
          accentLight: '#F3E8E6',
          accentDark: '#8E3224',
          gold: '#C5A059'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Space Mono"', 'ui-monospace', 'monospace']
      },
      letterSpacing: {
        'cinema-wide': '0.22em',
        'cinema-wider': '0.3em'
      }
    },
  },
  plugins: [],
}

