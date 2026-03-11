import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div>
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Inventory Manager</h3>
            <p>your one-stop solution for inventory management.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <a href="/">Home</a>
              <a href="/login">Login</a>
              <a href="/inventory">Inventory</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Inventory Manager. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
