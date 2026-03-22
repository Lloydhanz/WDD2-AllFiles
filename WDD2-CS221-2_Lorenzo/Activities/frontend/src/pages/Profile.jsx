import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/button";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  // NEW: This guarantees the form loads your saved data immediately
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        username: user.username || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        setIsError(false);
        setMessage("Profile updated successfully!");

        const updatedUser = { ...user, ...data };
        localStorage.setItem("user", JSON.stringify(updatedUser));

        setTimeout(() => window.location.reload(), 800);
      } else {
        setIsError(true);
        setMessage(data.message || "Failed to update profile.");
      }
    } catch (error) {
      setIsError(true);
      setMessage("An error occurred. Please try again.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone.",
    );
    if (!confirmDelete) return;

    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:3000/api/auth/profile", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert("Account deleted successfully.");
        logout();
        navigate("/");
      } else {
        const data = await response.json();
        alert(data.message || "Failed to delete account.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
      }}
    >
      <Header />
      <main
        style={{
          flex: 1,
          maxWidth: "800px",
          margin: "0 auto",
          padding: "3rem 1rem",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Card title="Your Profile">
            {message && (
              <div
                style={{
                  padding: "0.75rem",
                  marginBottom: "1.5rem",
                  borderRadius: "6px",
                  backgroundColor: isError ? "#fee" : "#e6fffa",
                  color: isError ? "var(--error-red)" : "#234e52",
                  border: `1px solid ${isError ? "var(--error-red)" : "#81e6d9"}`,
                }}
              >
                {message}
              </div>
            )}
            <form onSubmit={handleUpdate} className="login-form">
              <Input
                label="Full Name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="E.g., John Doe"
              />

              <Input
                label="Username"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />

              <Input
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input
                label="New Password (leave blank to keep current)"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="primary"
                style={{ marginTop: "1rem", marginBottom: "2rem" }}
              >
                Save Changes
              </Button>
            </form>

            <hr
              style={{
                margin: "2rem 0",
                borderColor: "var(--border-gray)",
                opacity: 0.3,
              }}
            />

            <div
              style={{
                textAlign: "center",
                padding: "1rem",
                backgroundColor: "#fff5f5",
                borderRadius: "8px",
                border: "1px solid #fed7d7",
              }}
            >
              <h3 style={{ color: "var(--error-red)", margin: "0 0 0.5rem 0" }}>
                Danger Zone
              </h3>
              <p
                style={{
                  fontSize: "0.9rem",
                  color: "#c53030",
                  marginBottom: "1.5rem",
                }}
              >
                Once you delete your account, there is no going back. Please be
                certain.
              </p>
              <Button
                type="button"
                onClick={handleDelete}
                style={{
                  backgroundColor: "var(--error-red)",
                  color: "white",
                  border: "none",
                }}
              >
                Delete Account
              </Button>
            </div>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
