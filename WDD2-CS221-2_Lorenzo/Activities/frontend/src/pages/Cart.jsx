import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/button";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import { createOrder } from "../services/orderService";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, clearCart } =
    useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "5rem" }}>
        <h2>You must be logged in to view your cart.</h2>
        <Link to="/login">
          <Button variant="primary">Go to Login</Button>
        </Link>
      </div>
    );
  }

  const handleCheckout = async () => {
    if (cart.length === 0) return;

    try {
      await createOrder({
        items: cart,
        total: cartTotal,
      });

      alert("Order placed successfully!");
      clearCart();
      navigate("/history");
    } catch (error) {
      alert("Error placing order: " + error.message);
    }
  };

  return (
    <div className="cart-page">
      <Header />
      <main className="cart-container">
        <h1 className="cart-title">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is currently empty.</p>
            <Link to="/shop">
              <Button variant="primary" style={{ marginTop: "1rem" }}>
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item._id} className="cart-item">
                  <div
                    className="item-image"
                    style={{
                      backgroundImage: `url(${item.imageUrl || "https://via.placeholder.com/300?text=No+Image"})`,
                    }}
                  />
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="item-actions">
                    <div className="quantity-controls">
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity - 1)
                        }
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item._id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      className="remove-btn"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <h3>Order Summary</h3>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="summary-row total">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Button
                variant="primary"
                onClick={handleCheckout}
                style={{ width: "100%", marginTop: "1.5rem" }}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
