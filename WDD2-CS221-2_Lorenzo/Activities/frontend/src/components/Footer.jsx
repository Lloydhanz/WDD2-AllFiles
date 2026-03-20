import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div>
      <footer className="footer-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h3>Retail Hub</h3>
            <p>Your ultimate destination for everyday shopping.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <a href="/">Home</a>
              <a href="/shop">Shop</a>
              <a href="/about">About</a>
            </div>
          </div>
          <div className="footer-bottom">
            <p>
              &copy; {new Date().getFullYear()} Retail Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
