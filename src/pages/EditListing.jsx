import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import ListingForm from "../components/ListingForms";
import toast from "react-hot-toast";

function EditListing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get("/listings/my");
        const listing = res.data.find((l) => l._id === id);
        if (!listing) throw new Error("Listing not found");
        setInitialData(listing);
      } catch (err) {
        toast.error("Failed to load listing");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      await axios.put(`/listings/${id}`, data);
      toast.success("Listing updated ✅");
      navigate("/dashboard");
    } catch (err) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !initialData) return <p className="p-4">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Listing</h2>
      <ListingForm
        initialData={initialData}
        onSubmit={handleUpdate}
        loading={loading}
      />
    </div>
  );
}

export default EditListing;
