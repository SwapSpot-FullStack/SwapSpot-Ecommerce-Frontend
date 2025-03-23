import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import placeholder from "../assets/placeholder.png";

function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    const found = mockListings.find((item) => item._id === id);

    if (!found) {
      setError("Listing not found");
    } else {
      setListing(found);
    }

    setLoading(false);
  }, [id]);

  if (loading) return <p className="page-message">Loading...</p>;
  if (error) return <p className="form-error">{error}</p>;

  return (
    <main className="login-page">
      <div
        className="glass-box"
        style={{ maxWidth: "600px", textAlign: "center" }}
      >
        <h2 className="form-title">{listing.title}</h2>
        <img
          src={listing.imageUrl || placeholder}
          alt={listing.title}
          style={{ width: "100%", borderRadius: "1rem", marginBottom: "1rem" }}
        />
        <p>
          <strong>Price:</strong> ${listing.price}
        </p>
        <p>
          <strong>Category:</strong> {listing.category}
        </p>
        <p style={{ marginTop: "1rem" }}>{listing.description}</p>
      </div>
    </main>
  );
}

export default ListingDetails;
