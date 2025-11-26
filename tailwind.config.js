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
          DEFAULT: '#000000',
          dark: '#1a1a1a',
          light: '#404040',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: 'inherit',
            a: {
              color: '#000000',
              '&:hover': {
                color: '#1a1a1a',
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
