import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    cors: true,
    proxy: {
      "/api": {
        target: "https://fiap-fsdt-techchallenge-ii-posts.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: true,
      },
    },
  },
  preview: {
    port: 5000,
    cors: true,
    allowedHosts: ["postech-fase-3.onrender.com/"],
    proxy: {
      "/api": {
        target: "https://fiap-fsdt-techchallenge-ii-posts.onrender.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        secure: true,
      },
    },
  },
});
