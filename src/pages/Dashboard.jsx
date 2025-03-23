import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api/axios";
import toast from "react-hot-toast";

function Dashboard() {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);

  const fetchMyListings = async () => {
    try {
      const res = await axios.get("/listings/my");
      setListings(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load your listings");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`/listings/${id}`);
      setListings((prev) => prev.filter((l) => l._id !== id));
      toast.success("Listing deleted successfully ✅");
    } catch (err) {
      toast.error("Delete failed ❌");
      console.error("Delete failed:", err);
    }
  };

  useEffect(() => {
    fetchMyListings();
  }, []);

  return (
    <main className="dashboard-page">
      <h2 className="dashboard-title">My Listings</h2>
      {error && <p className="form-error">{error}</p>}

      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Link to="/create" className="list-item-button">
          + Create New Listing
        </Link>
      </div>

      {listings.length === 0 ? (
        <p className="page-message">You haven’t listed anything yet!</p>
      ) : (
        <div className="dashboard-grid">
          {listings.map((listing) => (
            <div key={listing._id} className="dashboard-card">
              <div>
                <h3 className="card-title">{listing.title}</h3>
                <p className="card-description">{listing.description}</p>
                <p className="card-category">Category: {listing.category}</p>
                <Link to={`/edit/${listing._id}`} className="edit-link">
                  Edit
                </Link>
              </div>
              <button
                onClick={() => handleDelete(listing._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Dashboard;
