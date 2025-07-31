/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto-mono)'],
        heading: ['var(--font-roboto-mono)'],
        body: ['var(--font-roboto-mono)'],
      },
      colors: {
        brand: {
          DEFAULT: '#6cabde',
          dark: '#5a9ac8',
          light: '#7db8e4',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#6cabde',
              '&:hover': {
                color: '#5a9ac8',
              },
            },
            strong: {
              color: 'inherit',
            },
            code: {
              color: 'inherit',
            },
            h1: {
              color: 'inherit',
              fontFamily: 'var(--font-roboto-mono)',
            },
            h2: {
              color: 'inherit',
              fontFamily: 'var(--font-roboto-mono)',
            },
            h3: {
              color: 'inherit',
              fontFamily: 'var(--font-roboto-mono)',
            },
            h4: {
              color: 'inherit',
              fontFamily: 'var(--font-roboto-mono)',
            },
            blockquote: {
              color: 'inherit',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderRadius: 0,
              padding: 0,
            },
            thead: {
              color: 'inherit',
            },
            tbody: {
              tr: {
                borderBottomColor: 'inherit',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
