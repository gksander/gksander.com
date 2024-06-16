import colors from "tailwindcss/colors";
import typography from "@tailwindcss/typography";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        // TODO: get rid of these...
        primary: colors.cyan,
        secondary: colors.blue,

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

  plugins: [typography],
};
