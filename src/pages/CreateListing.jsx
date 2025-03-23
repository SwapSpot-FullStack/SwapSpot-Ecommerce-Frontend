import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingForm from "../components/ListingForms";
import axios from "../api/axios";
import toast from "react-hot-toast";

function CreateListing() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data) => {
    setLoading(true);
    try {
      await axios.post("/listings", data);
      toast.success("Listing created successfully!");
      navigate("/listings");
    } catch (err) {
      toast.error("Failed to create listing");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">Create a Listing</h2>
      <ListingForm initialData={{}} onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}

export default CreateListing;
