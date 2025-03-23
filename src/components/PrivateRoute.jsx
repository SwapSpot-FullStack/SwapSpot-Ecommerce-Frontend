import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth(); // This will check if the user is authenticated

  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to login page
    return <Navigate to="/login" />;
  }

  return children; // If authenticated, return the children (protected route)
}

export default PrivateRoute;
