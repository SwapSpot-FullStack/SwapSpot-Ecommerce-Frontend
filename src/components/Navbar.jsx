import { Link, useNavigate } from "react-router-dom";
// Link is used for client-side navigation without page reload
// useNavigate lets us programmatically navigate after logout

import { useAuth } from "../context/AuthContext";
// Custom context hook to access authentication state and logout function

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  // Destructure the auth state and logout function from context
  const navigate = useNavigate();
  // Hook to programmatically redirect the user

  const handleLogout = () => {
    logout(); // Clears authentication state
    navigate("/login"); // Redirect to login page after logging out
  };

  return (
    <nav className="sub-navbar">
      {/* Navigation links - always visible */}
      <Link to="/">🏠 Home</Link>
      <Link to="/listings">🛍️ Products</Link>
      <Link to="/chat">💬 Chat</Link>

      {isAuthenticated ? (
        <>
          {/* Links visible only when the user is logged in */}
          <Link to="/dashboard">📂 Dashboard</Link>
          <Link to="/create">➕ New</Link>

          {/* Logout button with onClick handler */}
          <button onClick={handleLogout} className="subnav-logout-btn">
            🚪 Logout
          </button>
        </>
      ) : (
        <>
          {/* Links shown to unauthenticated users */}
          <Link to="/login">🔐 Login</Link>
          <Link to="/register">📝 Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
