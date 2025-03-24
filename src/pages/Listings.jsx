import { useEffect, useState, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import { FaCommentDots, FaFilter, FaSortAmountDownAlt } from "react-icons/fa";
import placeholder from "../assets/placeholder.png";

// Component to display and filter a list of product listings
function Listings() {
  const [listings, setListings] = useState([]); // State to store filtered listings
  const [allListings, setAllListings] = useState([]); // State to store all listings
  const [loading, setLoading] = useState(true); // Loading state while fetching data
  const [error, setError] = useState(null); // Error state for any failures

  const [filterOpen, setFilterOpen] = useState(false); // State to manage filter dropdown visibility
  const [sortOpen, setSortOpen] = useState(false); // State to manage sort dropdown visibility

  const filterRef = useRef(); // Ref for filter dropdown
  const sortRef = useRef(); // Ref for sort dropdown
  const location = useLocation(); // Get current location (for query params)
  const queryParams = new URLSearchParams(location.search); // Parse query parameters
  const selectedCategory = queryParams.get("category"); // Get selected category from URL

  // Fetch listing data and apply category filter based on selected category
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

    setAllListings(mock); // Set all listings

    // If a category is selected in the URL, filter the listings by category
    if (selectedCategory) {
      const filtered = mock.filter(
        (item) => item.category === selectedCategory
      );
      setListings(filtered);
    } else {
      setListings(mock); // If no category selected, show all listings
    }

    setLoading(false); // Set loading state to false after fetching data
  }, [selectedCategory]); // Re-run effect if category changes

  // Close dropdowns if user clicks outside of them
  useEffect(() => {
    const closeDropdowns = (e) => {
      if (!filterRef.current?.contains(e.target)) setFilterOpen(false);
      if (!sortRef.current?.contains(e.target)) setSortOpen(false);
    };
    document.addEventListener("mousedown", closeDropdowns);
    return () => document.removeEventListener("mousedown", closeDropdowns); // Cleanup on component unmount
  }, []);

  // Handle category filter (e.g., Electronics, Fashion, etc.)
  const handleCategoryFilter = (category) => {
    const filtered = allListings.filter((item) => item.category === category);
    setListings(filtered); // Update the listings with the selected category
    setFilterOpen(false); // Close filter dropdown after selection
  };

  // Handle sorting listings by price (ascending or descending)
  const handleSort = (order) => {
    const sorted = [...listings].sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );
    setListings(sorted); // Update the listings with the sorted order
    setSortOpen(false); // Close sort dropdown after sorting
  };

  // Reset filters and show all listings again
  const resetListings = () => {
    setListings(allListings); // Reset to all listings
    setFilterOpen(false); // Close filter dropdown
    setSortOpen(false); // Close sort dropdown
  };

  // Display loading message if data is being fetched
  if (loading) return <p className="page-message">Loading listings...</p>;

  // Display error message if there is an error
  if (error) return <p className="form-error">{error}</p>;

  return (
    <main className="listings-page">
      <h2 className="pill-label">Products</h2>{" "}
      {/* Title for the listings page */}
      <div className="filter-sort-bar">
        {/* Filter Dropdown */}
        <div className="dropdown" ref={filterRef}>
          <button
            className="pill-button"
            onClick={() => {
              setFilterOpen(!filterOpen); // Toggle filter dropdown visibility
              setSortOpen(false); // Close sort dropdown when filter opens
            }}
          >
            <FaFilter style={{ marginRight: "6px" }} /> Filter{" "}
            {/* Filter button */}
          </button>
          {filterOpen && (
            <div className="dropdown-menu">
              {/* Category filter options */}
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
              <button onClick={resetListings}>Reset</button>{" "}
              {/* Reset filter */}
            </div>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="dropdown" ref={sortRef}>
          <button
            className="pill-button"
            onClick={() => {
              setSortOpen(!sortOpen); // Toggle sort dropdown visibility
              setFilterOpen(false); // Close filter dropdown when sort opens
            }}
          >
            <FaSortAmountDownAlt style={{ marginRight: "6px" }} /> Sort{" "}
            {/* Sort button */}
          </button>
          {sortOpen && (
            <div className="dropdown-menu">
              {/* Sort by price options */}
              <button onClick={() => handleSort("asc")}>
                Price: Low → High
              </button>
              <button onClick={() => handleSort("desc")}>
                Price: High → Low
              </button>
              <button onClick={resetListings}>Reset</button> {/* Reset sort */}
            </div>
          )}
        </div>
      </div>
      {/* If no listings found, show a message */}
      {listings.length === 0 ? (
        <p className="page-message">
          No listings yet. Be the first to list an item!
        </p>
      ) : (
        // If listings are available, display them in a grid
        <div className="listings-grid">
          {listings.map((listing) => (
            <Link
              to={`/listings/${listing._id}`} // Link to the detailed view of each listing
              className="listing-card-link"
              key={listing._id}
            >
              <div className="listing-card">
                <img
                  src={listing.imageUrl || placeholder} // Display listing image or placeholder
                  alt={listing.title} // Alt text for the image
                  className="listing-image"
                />
                <div className="listing-info">
                  <h3 className="card-title">{listing.title}</h3>{" "}
                  {/* Listing title */}
                  <p className="card-description">${listing.price}</p>{" "}
                  {/* Listing price */}
                  <p className="listing-description">
                    {listing.description}
                  </p>{" "}
                  {/* Listing description */}
                  <div className="listing-meta-row">
                    <span className="listing-category-pill">
                      {listing.category} {/* Listing category */}
                    </span>
                    {listing.user && listing.avatar && (
                      <Link
                        to={`/chat/${listing._id}`}
                        state={{ user: listing.user, avatar: listing.avatar }} // Pass user info to chat page
                        className="listing-icon"
                        title={`Message ${listing.user}`} // Tooltip showing user's name
                        onClick={(e) => e.stopPropagation()} // Prevent click propagation
                      >
                        <FaCommentDots />{" "}
                        {/* Comment icon to navigate to chat */}
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
