import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/button";
import { getAllProducts } from "../services/productService";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import "./Shop.css";

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { user } = useAuth();
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    if (!user) {
      alert("You must be logged in to order items.");
      return;
    }
    if (user.role === "Admin") {
      alert("Admins cannot place orders.");
      return;
    }
    addToCart(product);
    alert(`${product.name} has been added to your cart!`);
  };

  return (
    <div className="shop-page">
      <Header />
      <main className="shop-container">
        <div className="shop-header">
          <h1>Shop All Products</h1>
          <p>Find everything you need right here.</p>
        </div>

        {loading && <p className="loading-text">Loading products...</p>}
        {error && <p className="error-text">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="empty-text">No products available at the moment.</p>
        )}

        <div className="product-grid">
          {products.map((product) => (
            <div key={product._id} className="product-card">
              <div
                style={{
                  height: "200px",
                  backgroundImage: `url(${product.imageUrl || "https://via.placeholder.com/300?text=No+Image"})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: "8px 8px 0 0",
                  marginBottom: "1rem",
                }}
              />
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-desc">{product.description}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>

                {/* Hide button if Admin */}
                {(!user || user.role !== "Admin") && (
                  <Button
                    variant="primary"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
