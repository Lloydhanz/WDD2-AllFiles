import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { getAllProducts } from "../services/productService";

export default function AdminStats() {
  const [stats, setStats] = useState({ totalProducts: 0, totalValue: 0 });

  useEffect(() => {
    getAllProducts()
      .then((data) => {
        const value = data.reduce((sum, item) => sum + item.price, 0);
        setStats({ totalProducts: data.length, totalValue: value });
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="admin-content">
      <h2 style={{ marginBottom: "2rem" }}>Dashboard Statistics</h2>
      <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
        <Card title="Total Products">
          <h1 style={{ textAlign: "center", fontSize: "4rem", margin: 0 }}>
            {stats.totalProducts}
          </h1>
        </Card>
        <Card title="Total Inventory Value">
          <h1
            style={{
              textAlign: "center",
              fontSize: "3.5rem",
              margin: 0,
              color: "var(--secondary-green)",
            }}
          >
            ${stats.totalValue.toFixed(2)}
          </h1>
        </Card>
      </div>
    </div>
  );
}
