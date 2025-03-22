import { useEffect, useState } from "react";
import axios from "../api/axios";

function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("/listings");
        setListings(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  if (loading) return <p className="p-4">Loading listings...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {listings.map((listing) => (
        <div
          key={listing._id}
          className="border rounded-xl p-4 bg-white shadow hover:shadow-lg transition"
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-800">
            {listing.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">{listing.description}</p>
          <p className="text-xs text-gray-500 italic">
            Category: {listing.category}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Listings;
