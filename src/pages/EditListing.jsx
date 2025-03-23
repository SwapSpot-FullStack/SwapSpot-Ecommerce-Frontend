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
        const res = await axios.get(`/listings/${id}`); // ✅ RESTful route
        setInitialData(res.data);
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

  if (loading && !initialData)
    return (
      <div className="flex justify-center items-center min-h-screen text-white">
        Loading listing...
      </div>
    );

  return (
    <main className="login-page">
      <div
        className="glass-box"
        style={{ maxWidth: "600px", margin: "2rem auto" }}
      >
        <h2 className="form-title">Edit Listing</h2>
        <ListingForm
          initialData={initialData}
          onSubmit={handleUpdate}
          loading={loading}
        />
      </div>
    </main>
  );
}

export default EditListing;
