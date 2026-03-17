/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./config/projects.json",
  ],
  safelist: [
    {
      pattern: /bg-(indigo|blue|red|green|yellow|purple|pink|gray|slate)-(400|500|600|700|800|900)/,
      variants: ['hover', 'focus'],
    },
    {
      pattern: /text-(indigo|blue|red|green|yellow|purple|pink|gray|slate)-(400|500|600|700|800|900)/,
    }
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        'full': '9999px',
      },
      maxWidth: {
        'standard': '1280px',
      },
      boxShadow: {
        'tool': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }
    },
  },
  plugins: [],
}