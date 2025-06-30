import { ExternalLink, LogOut, Music, Shield, User } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();

  const openMusicLibrary = () => {
    // In a real micro frontend setup, this would load the remote module
    // For demo purposes, we'll open it in a new tab
    window.open("http://localhost:5174", "_blank");
  };

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

            <button
              onClick={openMusicLibrary}
              className="flex items-center gap-2 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-200 rounded-lg transition-all duration-200 hover:shadow-lg">
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Open Music Library</span>
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
    </header>
  );
};

export default Header;
