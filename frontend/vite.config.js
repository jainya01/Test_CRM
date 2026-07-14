import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import purgecss from "vite-plugin-purgecss";

export default defineConfig({
  base: "/laraib/",
  plugins: [
    react(),

    visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "stats.html",
    }),

    purgecss({
      content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
      safelist: [
        "active",
        "show",
        "collapse",
        "fade",
        "modal",
        "dropdown",
        "text-success",
        "text-danger",
        "text-muted",
        "bg-light",
        "btn",
        "btn-success",
        "btn-danger",
      ],
    }),
  ],
});
