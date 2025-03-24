import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import placeholder from "../assets/placeholder.png";

// Component to display the details of a specific listing
function ListingDetails() {
  const { id } = useParams(); // Get the listing ID from the URL parameters
  const [listing, setListing] = useState(null); // State to hold the fetched listing data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to handle errors

  // UseEffect hook to fetch listing data based on the listing ID from the URL
  useEffect(() => {
    const mockListings = [
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
    ];

    // Find the listing that matches the ID from the URL
    const found = mockListings.find((item) => item._id === id);

    if (!found) {
      setError("Listing not found"); // Set error if listing is not found
    } else {
      setListing(found); // Set the found listing in the state
    }

    setLoading(false); // Set loading to false once data fetching is complete
  }, [id]); // Dependency array ensures this runs whenever the ID changes

  // Display loading message while fetching data
  if (loading) return <p className="page-message">Loading...</p>;

  // Display error message if listing not found
  if (error) return <p className="form-error">{error}</p>;

  return (
    <main className="login-page">
      <div
        className="glass-box"
        style={{ maxWidth: "600px", textAlign: "center" }}
      >
        {/* Display the listing's title */}
        <h2 className="form-title">{listing.title}</h2>

        {/* Display listing image (use placeholder if imageUrl is not available) */}
        <img
          src={listing.imageUrl || placeholder}
          alt={listing.title} // Alt text for the image
          style={{ width: "100%", borderRadius: "1rem", marginBottom: "1rem" }}
        />

        {/* Display price and category */}
        <p>
          <strong>Price:</strong> ${listing.price}
        </p>
        <p>
          <strong>Category:</strong> {listing.category}
        </p>

        {/* Display the listing description */}
        <p style={{ marginTop: "1rem" }}>{listing.description}</p>
      </div>
    </main>
  );
}

export default ListingDetails;
