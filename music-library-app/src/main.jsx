import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// This is the function that the host will call
function renderMusicLibrary(elementId) {
  const root = createRoot(document.getElementById(elementId));
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// Expose the function globally
window.renderMusicLibrary = renderMusicLibrary;

// Optional: If you want to run this app independently for development
// During local dev (when not loaded by main-app), you might want to auto-render
if (
  import.meta.env.DEV &&
  !document.getElementById("music-library-container")
) {
  const devRoot = document.createElement("div");
  devRoot.id = "music-library-standalone-root";
  document.body.appendChild(devRoot);
  createRoot(devRoot).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
