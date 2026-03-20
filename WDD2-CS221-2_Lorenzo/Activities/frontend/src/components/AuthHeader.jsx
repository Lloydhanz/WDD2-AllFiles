import React from "react";
import { Link } from "react-router-dom";
import "./AuthHeader.css";

export default function AuthHeader() {
  return (
    <header className="auth-header">
      <div className="auth-header-container">
        <div className="logo auth-logo">
          <h2>Retail Hub</h2>
        </div>

        <div className="auth-navigation">
          <Link to="/" className="back-link">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="back-arrow-icon"
            >
              <path
                d="M19 12H5M5 12L12 19M5 12L12 5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Return to Home
          </Link>
        </div>
      </div>
    </header>
  );
}
