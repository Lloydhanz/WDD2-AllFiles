import React, { useEffect, useState } from "react";
import Button from "../components/button";
import { getAllProducts, deleteProduct } from "../services/productService";

export default function AdminDelete() {
  const [products, setProducts] = useState([]);

  const fetchProducts = () => {
    getAllProducts().then(setProducts).catch(console.error);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteProduct(id);
        alert("Product deleted successfully!");
        fetchProducts(); // Refresh the list
      } catch (error) {
        alert("Error deleting product: " + error.message);
      }
    }
  };

  return (
    <div className="admin-content">
      <h2 style={{ marginBottom: "1rem", color: "var(--error-red)" }}>
        Delete Products
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem",
              border: "1px solid #eee",
              borderRadius: "8px",
            }}
          >
            <span>
              <strong>{product.name}</strong> - ${product.price.toFixed(2)}
            </span>
            <Button
              onClick={() => handleDelete(product._id, product.name)}
              style={{
                backgroundColor: "var(--error-red)",
                border: "none",
                width: "auto",
              }}
            >
              Delete
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
