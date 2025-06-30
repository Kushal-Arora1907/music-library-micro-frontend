import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "http://localhost:5174/",
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"), // KEEP THIS LINE
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    lib: {
      entry: "src/main.jsx",
      name: "MusicLibraryApp",
      fileName: (format) => `music-library-app.${format}.js`,
      formats: ["umd"],
    },
    rollupOptions: {
      // REMOVE THE 'external' AND 'output.globals' SECTIONS ENTIRELY
      // external: ['react', 'react-dom'],
      // output: {
      //   globals: {
      //     react: 'React',
      //     'react-dom': 'ReactDOM',
      //   },
      // },
    },
  },
  server: {
    port: 5174,
  },
});
