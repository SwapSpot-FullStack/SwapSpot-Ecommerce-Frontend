import { useEffect, useState } from "react";
import axios from "../api/axios";
import {
  FaSearch,
  FaCommentDots,
  FaFilter,
  FaSortAmountDownAlt,
} from "react-icons/fa";
import placeholder from "../assets/placeholder.png";
import { Link } from "react-router-dom";

function Listings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const mock = [
          {
            _id: "1",
            title: "Tent",
            description:
              "Waterproof and lightweight. Great for hiking and camping.",
            price: 50,
            category: "Outdoors",
          },
          {
            _id: "2",
            title: "Coffee Maker",
            description: "Brew the best coffee. Works with ground or capsule.",
            price: 25,
            category: "Kitchen",
          },
          {
            _id: "3",
            title: "Bluetooth Speaker",
            description: "Portable with deep bass and long battery life.",
            price: 40,
            category: "Electronics",
          },
          {
            _id: "4",
            title: "Winter Jacket",
            description: "Warm and waterproof. Perfect for snow or rain.",
            price: 60,
            category: "Fashion",
          },
          {
            _id: "5",
            title: "Winter Jacket",
            description: "Warm and waterproof. Perfect for snow or rain.",
            price: 60,
            category: "Fashion",
          },
          {
            _id: "6",
            title: "Winter Jacket",
            description: "Warm and waterproof. Perfect for snow or rain.",
            price: 60,
            category: "Fashion",
          },
        ];
        setListings(mock);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const handleSort = () => {
    const sorted = [...listings].sort((a, b) => a.price - b.price);
    setListings(sorted);
  };

  const handleFilter = () => {
    const filtered = listings.filter((l) => l.category === "Outdoors");
    setListings(filtered);
  };

  if (loading) return <p className="page-message">Loading listings...</p>;
  if (error) return <p className="form-error">{error}</p>;

  return (
    <main className="listings-page">
      <div className="sub-navbar">
        <h2 className="pill-label">Products</h2>
      </div>

      <div className="filter-sort-bar">
        <button className="pill-button" onClick={handleFilter}>
          <FaFilter style={{ marginRight: "6px" }} />
          Filter
        </button>
        <button className="pill-button" onClick={handleSort}>
          <FaSortAmountDownAlt style={{ marginRight: "6px" }} />
          Sort
        </button>
      </div>

      {listings.length === 0 ? (
        <p className="page-message">
          No listings yet. Be the first to list an item!
        </p>
      ) : (
        <div className="listings-grid">
          {listings.map((listing) => (
            <Link
              to={`/listings/${listing._id}`}
              className="listing-card-link"
              key={listing._id}
            >
              <div className="listing-card">
                <img
                  src={listing.imageUrl || placeholder}
                  alt={listing.title}
                  className="listing-image"
                />
                <div className="listing-info">
                  <h3 className="card-title">{listing.title}</h3>
                  <p className="card-description">${listing.price}</p>
                  <p className="listing-description">{listing.description}</p>
                  <span className="listing-category-pill">
                    {listing.category}
                  </span>
                </div>
                <div className="listing-actions">
                  <button
                    className="listing-icon"
                    title="Message Seller"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Message feature coming soon!");
                    }}
                  >
                    <FaCommentDots />
                  </button>
                  <FaSearch className="listing-icon" title="View Item" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export default Listings;
