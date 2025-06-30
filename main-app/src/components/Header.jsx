// C:\Users\Asus\OneDrive\Desktop\New folder\main-app\src\components/Header.jsx

import { Info, LogOut, Music, Shield, User } from "lucide-react";
// REMOVE useState import: import { useState } from "react";
// REMOVE Modal import: import Modal from "./Modal";
import { useAuth } from "../context/AuthContext";

// Accept onOpenAbout prop
const Header = ({ onOpenAbout }) => {
  const { user, logout } = useAuth();
  // REMOVE state: const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  return (
    <header className="bg-white/10 backdrop-blur-md border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-lg">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Main App</h1>
              <p className="text-xs text-white/60">Authentication Container</p>
            </div>
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-white/10 rounded-lg">
              <div className="flex items-center gap-2">
                {user?.role === "admin" ? (
                  <Shield className="w-4 h-4 text-yellow-400" />
                ) : (
                  <User className="w-4 h-4 text-blue-400" />
                )}
                <span className="text-white/90 font-medium capitalize">
                  {user?.role}
                </span>
              </div>
              <span className="text-white/60">•</span>
              <span className="text-white/90">{user?.username}</span>
            </div>

            {/* "About" Button - now calls onOpenAbout prop */}
            <button
              onClick={onOpenAbout} // Use the prop here
              className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-200 rounded-lg transition-all duration-200 hover:shadow-lg">
              <Info className="w-4 h-4" />
              <span className="hidden sm:inline">About</span>
            </button>

            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 text-red-200 rounded-lg transition-all duration-200 hover:shadow-lg">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* REMOVE THE MODAL COMPONENT FROM HERE */}
      {/*
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
      */}
    </header>
  );
};

export default Header;
