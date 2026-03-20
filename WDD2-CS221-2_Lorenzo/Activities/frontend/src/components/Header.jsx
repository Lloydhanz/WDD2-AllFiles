import React from "react";
import "./Header.css";
import Button from "./button";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className="landing-header">
      <div className="header-container">
        <div className="logo">
          <h2>
            <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
              Retail Hub
            </Link>
          </h2>
        </div>
        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/about">About Us</Link>
          <Link to="/shop">Shop</Link>

          {user && user.role === "Admin" && (
            <Link to="/admin">Admin Dashboard</Link>
          )}

          {user && <Link to="/profile">Profile</Link>}

          {/* New History Link for standard users */}
          {user && user.role !== "Admin" && <Link to="/history">History</Link>}

          {/* Cart Link with count */}
          {user && user.role !== "Admin" && (
            <Link
              to="/cart"
              style={{ fontWeight: "bold", color: "var(--secondary-green)" }}
            >
              Cart ({cartCount})
            </Link>
          )}
        </nav>
        <div className="auth-section">
          {user ? (
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <span style={{ fontWeight: "bold", color: "var(--text-dark)" }}>
                Hi, {user.username || "User"}
              </span>
              <Button variant="secondary" onClick={handleLogout} type="button">
                Logout
              </Button>
            </div>
          ) : (
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button variant="primary" type="button">
                Login
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
