import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// A wrapper component to protect routes that require authentication
function PrivateRoute({ children }) {
  // Use the custom hook to get the authentication status from AuthContext
  const { isAuthenticated } = useAuth(); // This checks if the user is authenticated

  // If the user is not authenticated, redirect them to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login
  }

  // If the user is authenticated, render the children components (protected route)
  return children;
}

export default PrivateRoute;
