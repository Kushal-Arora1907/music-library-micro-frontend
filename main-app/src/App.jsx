import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Welcome to Main App!
            </h2>
            <p className="text-white/70 mb-6">
              You are successfully authenticated. Click the "Open Music Library"
              button in the header to access the Music Library micro frontend.
            </p>

            <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-semibold text-blue-200 mb-2">
                Micro Frontend Architecture
              </h3>
              <p className="text-blue-100/80 text-sm">
                This main app handles authentication and user management. The
                Music Library runs as a separate application on port 5174.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">
                  Your Role: {useAuth().user?.role}
                </h4>
                <ul className="text-white/70 text-sm space-y-1">
                  {useAuth().user?.role === "admin" ? (
                    <>
                      <li>• View all songs</li>
                      <li>• Add new songs</li>
                      <li>• Delete songs</li>
                      <li>• Full access to all features</li>
                    </>
                  ) : (
                    <>
                      <li>• View all songs</li>
                      <li>• Filter and sort songs</li>
                      <li>• Read-only access</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">Architecture</h4>
                <ul className="text-white/70 text-sm space-y-1">
                  <li>• Main App (Port 5173)</li>
                  <li>• Music Library (Port 5174)</li>
                  <li>• JWT Authentication</li>
                  <li>• Role-based Access Control</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
