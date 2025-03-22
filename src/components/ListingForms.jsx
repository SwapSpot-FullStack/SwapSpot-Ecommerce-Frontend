import { useState, useEffect } from "react";

function ListingForm({ initialData = {}, onSubmit, loading }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setPrice(initialData.price || "");
      setDescription(initialData.description || "");
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, price, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border rounded px-3 py-2"
        required
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        disabled={loading}
      >
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
}

export default ListingForm;
