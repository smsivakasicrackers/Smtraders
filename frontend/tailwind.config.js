/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Charcoal / midnight neutrals — dark sections, headings, admin shell
        ink: {
          50: '#f5f5f7',
          100: '#e8e8ec',
          200: '#cbccd4',
          300: '#a3a5b3',
          400: '#75778c',
          500: '#565873',
          600: '#41425c',
          700: '#33344a',
          800: '#212230',
          900: '#16161f',
          950: '#0b0b11',
        },
        // Warm ivory — default surfaces/backgrounds
        paper: {
          50: '#fffefb',
          100: '#fdf8ef',
          200: '#f8efdc',
          300: '#f0e2c2',
          400: '#e4cd9a',
          500: '#d3b674',
          600: '#b8974f',
          700: '#93753b',
          800: '#6b5630',
          900: '#453824',
        },
        // Festive red — primary brand/CTA color
        crimson: {
          50: '#fdf2f3',
          100: '#fce3e6',
          200: '#f9c8cf',
          300: '#f29aa8',
          400: '#e8637c',
          500: '#d63859',
          600: '#b81f42',
          700: '#941536',
          800: '#7a1330',
          900: '#68122c',
          950: '#390714',
        },
        // Gold — sparing accent (badges, dividers, premium touches)
        gold: {
          50: '#fdf9ec',
          100: '#faf0c9',
          200: '#f5df94',
          300: '#eec85b',
          400: '#e6b233',
          500: '#d69a1f',
          600: '#b87b17',
          700: '#935c17',
          800: '#794a19',
          900: '#673e19',
        },
        // Ember — secondary warm-orange highlight
        ember: {
          50: '#fff4ed',
          100: '#ffe4d2',
          200: '#ffc5a3',
          300: '#ff9d6b',
          400: '#fd7333',
          500: '#f6510f',
          600: '#e13a0a',
          700: '#ba290c',
          800: '#942211',
          900: '#781f12',
        },
      },
      fontFamily: {
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Fraunces"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 2px 8px -2px rgba(15,15,20,0.08), 0 1px 2px rgba(15,15,20,0.04)',
        card: '0 8px 24px -8px rgba(15,15,20,0.15), 0 2px 6px -2px rgba(15,15,20,0.06)',
        premium: '0 24px 60px -20px rgba(15,15,20,0.35)',
        glow: '0 0 0 1px rgba(214,154,31,0.18), 0 8px 30px -8px rgba(214,154,31,0.3)',
      },
      borderRadius: {
        card: '1rem',
        pill: '9999px',
      },
      maxWidth: {
        content: '1440px',
      },
      spacing: {
        18: '4.5rem',
        22: '5.5rem',
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
