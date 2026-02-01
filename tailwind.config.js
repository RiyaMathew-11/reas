/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Crimson Pro', 'ui-serif', 'Georgia', 'serif'],
      },
      colors: {
        border: 'hsl(212 26% 83%)',
        input: 'hsl(212 26% 83%)',
        ring: 'hsl(216 19% 26%)',
        background: 'hsl(209 40% 96%)',
        foreground: 'hsl(222 47% 11%)',
        primary: {
          DEFAULT: 'hsl(216 19% 26%)',
          foreground: 'hsl(210 19% 98%)',
        },
        secondary: {
          DEFAULT: 'hsl(215 19% 34%)',
          foreground: 'hsl(210 40% 98%)',
        },
        muted: {
          DEFAULT: 'hsl(215 20% 65%)',
          foreground: 'hsl(222 47% 11%)',
        },
        accent: {
          DEFAULT: 'hsl(210 40% 98%)',
          foreground: 'hsl(215 16% 46%)',
        },
        card: {
          DEFAULT: 'hsl(210 40% 98%)',
          foreground: 'hsl(222 47% 11%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 72% 50%)',
          foreground: 'hsl(0 85% 97%)',
        },
        success: {
          DEFAULT: 'hsl(142 70% 40%)',
          foreground: 'hsl(0 0% 100%)',
        },
      },
      borderRadius: {
        lg: '0.5rem',
        md: '0.375rem',
        sm: '0.25rem',
      },
      boxShadow: {
        'card': '0 1px 3px 0 hsl(220 20% 15% / 0.04), 0 1px 2px -1px hsl(220 20% 15% / 0.04)',
        'card-hover': '0 10px 25px -5px hsl(220 20% 15% / 0.1), 0 8px 10px -6px hsl(220 20% 15% / 0.06)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(4px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
