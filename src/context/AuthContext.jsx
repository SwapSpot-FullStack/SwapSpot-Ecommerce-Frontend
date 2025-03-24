import { createContext, useContext, useState, useEffect } from "react";

// Create an AuthContext to provide authentication state across the app
const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Initialize token state from localStorage, or default to null
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  // Set the authentication state based on the token presence
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  // When the token changes, update the authentication state
  useEffect(() => {
    setIsAuthenticated(!!token); // Set to true if token exists, false otherwise
  }, [token]);

  // Function to log in by storing the token in localStorage and updating state
  const login = (newToken) => {
    localStorage.setItem("token", newToken); // Save token in localStorage
    setToken(newToken); // Update the token state
  };

  // Function to log out by removing the token from localStorage and resetting state
  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setToken(null); // Clear token state
  };

  return (
    // Provide the token, authentication status, and login/logout functions to the app
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children} {/* Render the child components */}
    </AuthContext.Provider>
  );
}

// Custom hook to use AuthContext in any component
export function useAuth() {
  return useContext(AuthContext);
}
