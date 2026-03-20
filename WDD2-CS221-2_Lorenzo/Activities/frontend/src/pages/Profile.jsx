import React, { useState } from "react";
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
    username: user?.username || "",
    email: user?.email || "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

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
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        setIsError(true);
        setMessage(data.message || "Failed to update profile.");
      }
    } catch (error) {
      setIsError(true);
      setMessage("Error updating profile.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you absolutely sure you want to delete your account? This cannot be undone.",
    );

    if (confirmDelete) {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:3000/api/auth/profile", {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          await logout();
          navigate("/");
        } else {
          setIsError(true);
          setMessage("Failed to delete account.");
        }
      } catch (error) {
        setIsError(true);
        setMessage("Error deleting account.");
      }
    }
  };

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "5rem" }}>
        <h2>Please log in to view this page.</h2>
      </div>
    );
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <main
        style={{
          flex: 1,
          padding: "3rem 1rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "100%", maxWidth: "500px" }}>
          <Card title="Account Settings">
            {message && (
              <div
                style={{
                  padding: "1rem",
                  marginBottom: "1rem",
                  borderRadius: "8px",
                  backgroundColor: isError ? "#fee" : "#e6fffa",
                  color: isError
                    ? "var(--error-red)"
                    : "var(--secondary-green)",
                  border: `1px solid ${isError ? "var(--error-red)" : "var(--secondary-green)"}`,
                }}
              >
                {message}
              </div>
            )}

            <form onSubmit={handleUpdate}>
              <Input
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                label="New Password (leave blank to keep current)"
                name="password"
                type="password"
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
