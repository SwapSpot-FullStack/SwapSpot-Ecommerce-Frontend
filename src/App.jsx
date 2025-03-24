import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";

// Importing pages and components
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Listings from "./pages/Listings";
import CreateListing from "./pages/CreateListing";
import EditListing from "./pages/EditListing";
import PrivateRoute from "./utils/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import "./index.css";
import ListingDetails from "./pages/ListingDetails";
import ChatList from "./pages/ChatList";
import ChatPage from "./pages/ChatPage";

// AppWrapper component that handles the routes and layout of the app
function AppWrapper() {
  // Get the current location (URL path) to conditionally render the Navbar
  const location = useLocation();
  const isHomePage = location.pathname === "/"; // Check if we are on the home page

  return (
    <>
      {/* Render Navbar only if not on the homepage */}
      {!isHomePage && <Navbar />} {/* ✅ Hide on homepage */}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
        <Route path="/listings" element={<Listings />} /> {/* Listings page */}
        <Route path="/register" element={<Register />} />{" "}
        {/* Registration page */}
        <Route path="/listings/:id" element={<ListingDetails />} />{" "}
        {/* Listing details page */}
        <Route path="/chat" element={<ChatList />} /> {/* Chat list page */}
        <Route path="/chat/:id" element={<ChatPage />} />{" "}
        {/* Individual chat page */}
        {/* Protected Routes wrapped with PrivateRoute to ensure authentication */}
        <Route
          path="/create"
          element={
            <PrivateRoute>
              <CreateListing />
            </PrivateRoute>
          } // Create listing page (requires authentication)
        />
        <Route
          path="/edit/:id"
          element={
            <PrivateRoute>
              <EditListing />
            </PrivateRoute>
          } // Edit listing page (requires authentication)
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } // User dashboard page (requires authentication)
        />
      </Routes>
    </>
  );
}

// Main App component that wraps everything in a Router
function App() {
  return (
    <Router>
      <AppWrapper /> {/* AppWrapper contains the routes and layout */}
    </Router>
  );
}

export default App;
