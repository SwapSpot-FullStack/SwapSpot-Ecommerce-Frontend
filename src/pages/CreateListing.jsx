import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingForm from "../components/ListingForms";
import axios from "../api/axios";
import toast from "react-hot-toast";

// Component for creating a new listing
function CreateListing() {
  const [loading, setLoading] = useState(false); // Loading state for form submission
  const navigate = useNavigate(); // Navigate hook to redirect after successful submission

  // Handle form submission
  const handleSubmit = async (data) => {
    setLoading(true); // Set loading to true while processing the request
    try {
      // Send POST request to the backend to create a new listing
      await axios.post("/listings", data);
      toast.success("Listing created successfully!"); // Show success toast
      navigate("/listings"); // Redirect to the listings page after successful creation
    } catch (err) {
      // Show error toast if the request fails
      toast.error("Failed to create listing");
    } finally {
      // Reset loading state once the request completes (success or failure)
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow">
      {/* Page heading for the create listing form */}
      <h2 className="text-2xl font-bold mb-4">Create a Listing</h2>

      {/* Render the ListingForm component and pass the necessary props */}
      <ListingForm initialData={{}} onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}

export default CreateListing;
