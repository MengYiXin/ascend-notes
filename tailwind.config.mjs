/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 借鉴你现有 Hexo 博客的克制配色 + Ascend 蓝
        brand: {
          DEFAULT: '#06c',
          dark: '#0075eb'
        },
        ink: {
          50:  '#f7f7f7',
          100: '#ededef',
          200: '#d2d2d7',
          300: '#b3b3b3',
          400: '#9595a2',
          500: '#808091',
          600: '#595967',
          700: '#4c4c57',
          800: '#484853',
          900: '#32333a',
          950: '#242429'
        }
      },
      fontFamily: {
        sans: ['Optima-Regular', 'Optima', '-apple-system', 'system-ui', '"Segoe UI"', 'Roboto', '"PingFang SC"', '"Hiragino Sans GB"', '"Microsoft YaHei"', 'sans-serif'],
        mono: ['"Source Code Pro"', 'Consolas', 'Menlo', 'monospace']
      },
      maxWidth: {
        prose: '72ch',
        shell: '1280px'
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': theme('colors.ink.800'),
            '--tw-prose-headings': theme('colors.ink.900'),
            '--tw-prose-links': theme('colors.brand.DEFAULT'),
            maxWidth: '72ch'
          }
        }
      })
    }
  },
  plugins: []
};
