import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";

// Dashboard component to display user's listings
function Dashboard() {
  const [listings, setListings] = useState([]); // State to store user's listings
  const [error, setError] = useState(null); // State for handling any errors

  // Function to fetch user's listings from the backend
  const fetchMyListings = async () => {
    try {
      const res = await axios.get("/listings/my"); // Fetch the listings
      setListings(res.data); // Update state with the fetched listings
    } catch (err) {
      // Handle error if the fetch request fails
      setError(err.response?.data?.message || "Failed to load your listings");
    }
  };

  // Function to handle the deletion of a listing
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return; // If user cancels, don't delete

    try {
      await axios.delete(`/listings/${id}`); // Send DELETE request to the backend
      setListings((prev) => prev.filter((l) => l._id !== id)); // Remove listing from state
      toast.success("Listing deleted successfully ✅"); // Show success toast
    } catch (err) {
      toast.error("Delete failed ❌"); // Show error toast if delete fails
      console.error("Delete failed:", err); // Log error to console
    }
  };

  // Fetch user's listings when component mounts
  useEffect(() => {
    fetchMyListings();
  }, []); // Empty dependency array ensures this runs only once on mount

  return (
    <main className="dashboard-page">
      {/* Dashboard title */}
      <h2 className="dashboard-title">My Listings</h2>

      {/* Display error message if there is an error */}
      {error && <p className="form-error">{error}</p>}

      {/* Button to create a new listing */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Link to="/create" className="list-item-button">
          + Create New Listing
        </Link>
      </div>

      {/* If there are no listings, display a message */}
      {listings.length === 0 ? (
        <p className="page-message">You haven’t listed anything yet!</p>
      ) : (
        // If there are listings, display them in a grid
        <div className="dashboard-grid">
          {listings.map((listing) => (
            <div key={listing._id} className="dashboard-card">
              <div>
                <h3 className="card-title">{listing.title}</h3>{" "}
                {/* Listing title */}
                <p className="card-description">{listing.description}</p>{" "}
                {/* Listing description */}
                <p className="card-category">
                  Category: {listing.category}
                </p>{" "}
                {/* Listing category */}
                <Link to={`/edit/${listing._id}`} className="edit-link">
                  Edit {/* Link to edit listing */}
                </Link>
              </div>
              {/* Delete button */}
              <button
                onClick={() => handleDelete(listing._id)} // Handle delete when clicked
                className="delete-button"
              >
                Delete {/* Delete listing button */}
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Dashboard;
