import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined);

// Mock users and credentials
const mockUsers = [
  {
    id: "1",
    username: "admin",
    role: "admin",
    email: "admin@music.com",
  },
  {
    id: "2",
    username: "user",
    role: "user",
    email: "user@music.com",
  },
];

const mockCredentials = {
  admin: { username: "admin", password: "admin123" },
  user: { username: "user", password: "user123" },
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Check for existing token in localStorage
    const storedToken = localStorage.getItem("musicApp_token");
    const storedUser = localStorage.getItem("musicApp_user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const generateMockJWT = (user) => {
    // This is a mock JWT - in production, this would come from your backend
    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(
      JSON.stringify({
        sub: user.id,
        username: user.username,
        role: user.role,
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      })
    );
    const signature = btoa("mock-signature");

    return `${header}.${payload}.${signature}`;
  };

  const login = async (username, password) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Check credentials
    const validCredential = Object.entries(mockCredentials).find(
      ([_, cred]) => cred.username === username && cred.password === password
    );

    if (validCredential) {
      const userData = mockUsers.find((u) => u.username === username);
      if (userData) {
        const mockToken = generateMockJWT(userData);

        setUser(userData);
        setToken(mockToken);

        // Store in localStorage
        localStorage.setItem("musicApp_token", mockToken);
        localStorage.setItem("musicApp_user", JSON.stringify(userData));

        return true;
      }
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("musicApp_token");
    localStorage.removeItem("musicApp_user");
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!user && !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
