import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaCommentDots, FaFilter, FaSortAmountDownAlt } from "react-icons/fa";
import placeholder from "../assets/placeholder.png";

function Listings() {
  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filterOpen, setFilterOpen] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);

  const filterRef = useRef();
  const sortRef = useRef();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  useEffect(() => {
    const mock = [
      {
        _id: "1",
        title: "Tent",
        price: 50,
        category: "Outdoors",
        description: "Waterproof and lightweight.",
        user: "Sarah",
        avatar: "👩‍🦰",
      },
      {
        _id: "2",
        title: "Coffee Maker",
        price: 25,
        category: "Kitchen",
        description: "Brew the best coffee.",
        user: "Alex",
        avatar: "👨🏻",
      },
      {
        _id: "3",
        title: "Bluetooth Speaker",
        price: 40,
        category: "Electronics",
        description: "Portable with deep bass.",
        user: "John",
        avatar: "🧔🏻",
      },
      {
        _id: "4",
        title: "Winter Jacket",
        price: 60,
        category: "Fashion",
        description: "Warm and waterproof.",
        user: "Bartholomew",
        avatar: "🧑‍🎨",
      },
    ];

    setAllListings(mock);

    if (selectedCategory) {
      const filtered = mock.filter(
        (item) => item.category === selectedCategory
      );
      setListings(filtered);
    } else {
      setListings(mock);
    }

    setLoading(false);
  }, [selectedCategory]);

  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!filterRef.current?.contains(e.target)) setFilterOpen(false);
      if (!sortRef.current?.contains(e.target)) setSortOpen(false);
    };
    document.addEventListener("mousedown", closeDropdowns);
    return () => document.removeEventListener("mousedown", closeDropdowns);
  }, []);

  const handleCategoryFilter = (category) => {
    const filtered = allListings.filter((item) => item.category === category);
    setListings(filtered);
    setFilterOpen(false);
  };

  const handleSort = (order) => {
    const sorted = [...listings].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setListings(sorted);
    setSortOpen(false);
  };

  const resetListings = () => {
    setListings(allListings);
    setFilterOpen(false);
    setSortOpen(false);
  };

  if (loading) return <p className="page-message">Loading listings...</p>;
  if (error) return <p className="form-error">{error}</p>;

  return (
    <main className="listings-page">
      <h2 className="pill-label">Products</h2>

      <div className="filter-sort-bar">
        {/* Filter Dropdown */}
        <div className="dropdown" ref={filterRef}>
          <button
            className="pill-button"
            onClick={() => {
              setFilterOpen(!filterOpen);
              setSortOpen(false);
            }}
          >
            <FaFilter style={{ marginRight: "6px" }} />
            Filter
          </button>
          {filterOpen && (
            <div className="dropdown-menu">
              <button onClick={() => handleCategoryFilter("Electronics")}>
                Electronics
              </button>
              <button onClick={() => handleCategoryFilter("Fashion")}>
                Fashion
              </button>
              <button onClick={() => handleCategoryFilter("Outdoors")}>
                Outdoors
              </button>
              <button onClick={() => handleCategoryFilter("Kitchen")}>
                Kitchen
              </button>
              <button onClick={resetListings}>Reset</button>
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="dropdown" ref={sortRef}>
          <button
            className="pill-button"
            onClick={() => {
              setSortOpen(!sortOpen);
              setFilterOpen(false);
            }}
          >
            <FaSortAmountDownAlt style={{ marginRight: "6px" }} />
            Sort
          </button>
          {sortOpen && (
            <div className="dropdown-menu">
              <button onClick={() => handleSort("asc")}>
                Price: Low → High
              </button>
              <button onClick={() => handleSort("desc")}>
                Price: High → Low
              </button>
              <button onClick={resetListings}>Reset</button>
            </div>
          )}
        </div>
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

                  <div className="listing-meta-row">
                    <span className="listing-category-pill">
                      {listing.category}
                    </span>
                    {listing.user && listing.avatar && (
                      <Link
                        to={`/chat/${listing._id}`}
                        state={{ user: listing.user, avatar: listing.avatar }}
                        className="listing-icon"
                        title={`Message ${listing.user}`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaCommentDots />
                      </Link>
                    )}
                  </div>
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
