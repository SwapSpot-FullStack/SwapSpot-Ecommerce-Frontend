import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import ListingForm from "../components/ListingForms";
import toast from "react-hot-toast";

// Component to handle editing an existing listing
function EditListing() {
  const { id } = useParams(); // Get the listing ID from the URL params
  const navigate = useNavigate(); // Navigation hook to redirect after update
  const [initialData, setInitialData] = useState(null); // State to store initial listing data
  const [loading, setLoading] = useState(true); // State to handle loading state while fetching data

  // Fetch listing data on mount to pre-populate the form
  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(`/listings/${id}`); // Fetch the listing by ID from backend
        setInitialData(res.data); // Set the data to state if successful
      } catch (err) {
        toast.error("Failed to load listing"); // Show error if fetch fails
      } finally {
        setLoading(false); // Turn off loading state once data is fetched
      }
    };

    fetchListing();
  }, [id]); // Dependency array includes `id`, so it refetches if the ID changes

  // Handle form submission to update the listing
  const handleUpdate = async (data) => {
    try {
      setLoading(true); // Show loading state while updating
      await axios.put(`/listings/${id}`, data); // Send PUT request to update the listing
      toast.success("Listing updated ✅"); // Show success toast on update
      navigate("/dashboard"); // Redirect to the dashboard after successful update
    } catch (err) {
      toast.error("Update failed"); // Show error toast if the update fails
    } finally {
      setLoading(false); // Turn off loading state after the update process
    }
  };

  // Show loading spinner while fetching data
  if (loading && !initialData)
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading listing...
      </div>
    );

  return (
    <main className="login-page">
      {/* Form container with glassmorphism style */}
      <div
        className="glass-box"
        style={{ maxWidth: "600px", margin: "2rem auto" }}
      >
        <h2 className="form-title">Edit Listing</h2> {/* Title for the form */}
        {/* Pass the fetched initial data, submit handler, and loading state to the ListingForm */}
        <ListingForm
          initialData={initialData} // Pre-fill the form with the fetched listing data
          onSubmit={handleUpdate} // Submit the updated data
          loading={loading} // Disable the form while it's loading
        />
      </div>
    </main>
  );
}

export default EditListing;
