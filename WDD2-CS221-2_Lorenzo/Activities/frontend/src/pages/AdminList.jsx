import React, { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";

export default function AdminList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts().then(setProducts).catch(console.error);
  }, []);

  return (
    <div className="admin-content">
      <h2 style={{ marginBottom: "1rem" }}>Inventory List</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {products.map((product) => (
          <div
            key={product._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "1rem",
              border: "1px solid #eee",
              borderRadius: "8px",
            }}
          >
            <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
              <img
                src={product.imageUrl || "https://via.placeholder.com/50"}
                alt={product.name}
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "4px",
                }}
              />
              <div>
                <h4 style={{ margin: 0 }}>{product.name}</h4>
                <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
                  {product.description}
                </p>
              </div>
            </div>
            <strong style={{ color: "var(--secondary-green)" }}>
              ${product.price.toFixed(2)}
            </strong>
          </div>
        ))}
        {products.length === 0 && <p>No products found.</p>}
      </div>
    </div>
  );
}
