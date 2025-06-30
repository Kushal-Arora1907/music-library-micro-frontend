// C:\Users\Asus\OneDrive\Desktop\New folder\main-app\src\App.jsx

import { useState } from "react"; // Import useState
import AuthenticatedContent from "./components/AuthenticatedContent";
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import Modal from "./components/Modal"; // Import Modal component
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false); // Move state here

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Pass setIsAboutModalOpen to Header so it can open the modal */}
      <Header onOpenAbout={() => setIsAboutModalOpen(true)} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AuthenticatedContent />
      </main>

      {/* RENDER THE MODAL HERE, directly in App.jsx */}
      <Modal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        title="About This Application">
        <p>
          This is a demonstration of a Music Library Micro Frontend
          architecture.
        </p>
        <p>
          The Main App handles authentication and loads the Music Library (a
          separate app) dynamically.
        </p>
        <p className="text-white/60 text-sm mt-4">
          Developed using React, Vite, and Tailwind CSS.
        </p>
      </Modal>
    </div>
  );
}

export default App;
