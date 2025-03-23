import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sub-navbar">
      <Link to="/">🏠 Home</Link>
      <Link to="/listings">🛍️ Products</Link>
      <Link to="/chat">💬 Chat</Link>

      {isAuthenticated ? (
        <>
          <Link to="/dashboard">📂 Dashboard</Link>
          <Link to="/create">➕ New</Link>
          <button onClick={handleLogout} className="subnav-logout-btn">
            🚪 Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login">🔐 Login</Link>
          <Link to="/register">📝 Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
