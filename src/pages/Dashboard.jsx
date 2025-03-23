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
    const confirm = window.confirm(
      "Are you sure you want to delete this listing?"
    );
    if (!confirm) return;

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
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">My Listings</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="border p-4 rounded-xl bg-white shadow flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-semibold">{listing.title}</h3>
              <p className="text-sm text-gray-600">{listing.description}</p>
              <p className="text-xs text-gray-400 mt-2 italic">
                Category: {listing.category}
              </p>

              {/* 👇 EDIT LINK */}
              <Link
                to={`/edit/${listing._id}`}
                className="text-blue-600 hover:underline text-sm inline-block mt-2"
              >
                Edit
              </Link>
            </div>

            <button
              onClick={() => handleDelete(listing._id)}
              className="mt-4 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
