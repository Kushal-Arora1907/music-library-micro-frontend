// C:\Users\Asus\OneDrive\Desktop\New folder\main-app\src\components\AuthenticatedContent.jsx

import { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

function AuthenticatedContent() {
  const { user } = useAuth(); // Keeping this in case you want to display user info within the content later
  const musicLibraryRef = useRef(null);

  useEffect(() => {
    if (musicLibraryRef.current) {
      if (window.renderMusicLibrary) {
        window.renderMusicLibrary(musicLibraryRef.current.id);
        return;
      }

      const script = document.createElement("script");

      script.src =
        "https://imaginative-mermaid-808092.netlify.app/music-library-app.umd.js";
      script.async = true;

      script.onload = () => {
        if (window.renderMusicLibrary) {
          window.renderMusicLibrary(musicLibraryRef.current.id);
        } else {
          console.error(
            "Failed to load Music Library micro-frontend: renderMusicLibrary function not found."
          );
        }
      };

      script.onerror = (e) => {
        console.error("Error loading Music Library micro-frontend script:", e);
      };

      document.body.appendChild(script);

      return () => {
        // Optional cleanup
      };
    }
  }, []);

  return (
    // Only the container for the Music Library Micro Frontend
    // All previous intro text, architecture details, and role info are removed
    <div id="music-library-container" ref={musicLibraryRef} className="mt-0">
      {" "}
      {/* Adjusted mt-0 for spacing */}
      {/* Loading spinner/text while the music library is loading */}
      <div className="text-white/70 text-lg flex items-center justify-center p-8">
        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3" />
        Loading Music Library...
      </div>
    </div>
  );
}

export default AuthenticatedContent;
