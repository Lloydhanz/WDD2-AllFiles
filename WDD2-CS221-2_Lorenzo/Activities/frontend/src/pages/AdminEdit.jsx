import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import TextArea from "../components/TextArea";
import Button from "../components/button";
import { getAllProducts, updateProduct } from "../services/productService";

export default function AdminEdit() {
  const [products, setProducts] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    imageUrl: "",
  });

  useEffect(() => {
    getAllProducts().then(setProducts).catch(console.error);
  }, []);

  // When a product is selected from the dropdown, fill the form
  const handleSelect = (e) => {
    const id = e.target.value;
    setSelectedId(id);
    const product = products.find((p) => p._id === id);
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        imageUrl: product.imageUrl || "",
      });
    } else {
      setFormData({ name: "", description: "", price: 0, imageUrl: "" });
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedId) return alert("Please select a product first.");

    try {
      await updateProduct(selectedId, formData);
      alert("Product updated successfully!");
      // Refresh the products list to get new names if changed
      const updated = await getAllProducts();
      setProducts(updated);
    } catch (error) {
      alert("Error updating product: " + error.message);
    }
  };

  return (
    <div className="admin-content">
      <h2 style={{ marginBottom: "1.5rem" }}>Edit Product</h2>

      <div style={{ marginBottom: "2rem" }}>
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontWeight: "bold",
          }}
        >
          Select Product to Edit:
        </label>
        <select
          value={selectedId}
          onChange={handleSelect}
          style={{
            width: "100%",
            padding: "0.75rem",
            borderRadius: "8px",
            border: "2px solid var(--border-gray)",
          }}
        >
          <option value="">-- Select a product --</option>
          {products.map((p) => (
            <option key={p._id} value={p._id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>

      {selectedId && (
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <Input
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            label="Image URL"
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          <TextArea
            label="Description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
          />
          <Input
            label="Price"
            name="price"
            type="number"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            required
          />

          <Button type="submit" variant="primary">
            Save Changes
          </Button>
        </form>
      )}
    </div>
  );
}
