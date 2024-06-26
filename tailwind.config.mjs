import colors from "tailwindcss/colors";
import typography from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        fancy: ["Merriweather Sans Variable", "sans-serif"],
      },
      colors: {
        // TODO: get rid of these...
        primary: colors.cyan,
        secondary: colors.blue,

        background: {
          light: "#deded0",
          DEFAULT: "#E4E3D8",
          dark: "#d0d0ad",
        },
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
        content: "50rem",
        "wide-content": "62rem",
      },

      // Create breakout-{space} classes for full-bleed content
      spacing: () => {
        const wideContent = "62rem";
        const spaces = defaultTheme.spacing;

        return ["4", "8"].reduce((acc, space) => {
          acc[`breakout-${space}`] =
            `calc(max(0vw, (100vw - ${wideContent}) / 2) + ${spaces[space]})`;
          return acc;
        }, {});
      },
    },
    container: {
      center: true,
    },
  },

  plugins: [typography],
};
