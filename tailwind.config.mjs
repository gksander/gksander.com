/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#E4E3D8",
        accent: {
          DEFAULT: "#486242",
          light: "#8BA484",
        },
        white: "#F5F5F5",
        black: {
          light: "#494848",
          DEFAULT: "#1A1A1A",
        },
        "subtle-copy": "#505047",
      },
      maxWidth: {
        content: "55rem",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
