// main-app/src/App.jsx
import AuthenticatedContent from "./components/AuthenticatedContent"; // Import the new component
import Header from "./components/Header";
import LoginForm from "./components/LoginForm";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth(); // This is the ONLY hook called here now, and it's unconditional

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  // If authenticated, render the main layout with the new component
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AuthenticatedContent /> {/* Render the new component here */}
      </main>
    </div>
  );
}

export default App;
