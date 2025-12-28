import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite configuration for the web app
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // Dev server port (default for Vite)
    open: true // open in browser on start
  }
});
