import { useState, useEffect } from "react";

// A reusable form component for creating/editing listings
// `initialData` allows the form to be pre-filled when editing
// `onSubmit` is a handler passed from the parent to process form data
// `loading` disables the form during async operations
function ListingForm({ initialData = {}, onSubmit, loading }) {
  // State hooks to manage form inputs
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  // Populate form fields if `initialData` is provided (e.g., during editing)
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || ""); // Default to empty string if undefined
      setPrice(initialData.price || "");
      setDescription(initialData.description || "");
    }
  }, [initialData]); // Only run when initialData changes

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent full page reload
    onSubmit({ title, price, description }); // Pass form data back to parent
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title input */}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Controlled input
        className="w-full border rounded px-3 py-2" // Styled input
        required // Prevent form submission if empty
      />

      {/* Price input */}
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      />

      {/* Description textarea */}
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      />

      {/* Submit button with dynamic label */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={loading} // Prevent double submission
      >
        {loading ? "Saving..." : "Submit"} {/* Show loading state */}
      </button>
    </form>
  );
}

export default ListingForm;
