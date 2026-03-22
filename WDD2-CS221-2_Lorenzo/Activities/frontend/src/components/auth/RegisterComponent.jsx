import React, { useState } from "react";
import Input from "../Input";
import Button from "../button";
import { authService } from "../../services/authService";

const RegisterComponent = ({ noCard }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await authService.register(formData);
      setSuccess("Registration successful! You can now log in.");

      setFormData({ fullName: "", username: "", email: "", password: "" });
    } catch (err) {
      setError(err.message || "Failed to register");
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="login-form">
      {error && <div className="alert-error">{error}</div>}
      {success && (
        <div
          style={{
            color: "green",
            marginBottom: "1rem",
            padding: "0.5rem",
            backgroundColor: "#e6fffa",
            borderRadius: "6px",
          }}
        >
          {success}
        </div>
      )}

      <Input
        label="Full Name"
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        placeholder="Enter your full name"
        required
      />

      <Input
        label="Username"
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Enter your username"
        required
      />
      <Input
        label="Email"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Enter your email"
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Create a password"
        required
      />
      <Button type="submit" loading={loading} style={{ marginTop: "1rem" }}>
        Register
      </Button>
    </form>
  );

  return noCard ? (
    formContent
  ) : (
    <div className="auth-card-wrapper">{formContent}</div>
  );
};

export default RegisterComponent;
