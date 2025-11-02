import { createTheme } from "@mantine/core";

export const theme = createTheme({
  /** Primary color scheme */
  primaryColor: "blue",

  /** Default radius for all components */
  defaultRadius: "md",

  /** Font settings */
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: {
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",
    fontWeight: "700",
    sizes: {
      h1: { fontSize: "3rem", lineHeight: "1.2" },
      h2: { fontSize: "2.25rem", lineHeight: "1.3" },
      h3: { fontSize: "1.5rem", lineHeight: "1.4" },
    },
  },

  /** Spacing */
  spacing: {
    xs: "0.5rem",
    sm: "0.75rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  },

  /** Color scheme settings */
  colors: {
    // You can add custom colors here if needed
  },

  /** Other settings */
  cursorType: "pointer",
});
