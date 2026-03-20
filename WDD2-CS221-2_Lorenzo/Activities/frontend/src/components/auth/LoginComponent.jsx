import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Input from "../Input";
import Button from "../button";

const LoginComponent = ({ noCard }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    if (!formData.email || !formData.password) {
      setErrors({ form: "Please fill in all fields" });
      return;
    }

    setLoading(true);
    try {
      const loggedInUser = await login(formData);

      // FIX: Redirect based on role
      if (
        loggedInUser?.role === "Admin" ||
        loggedInUser?.role === "Moderator"
      ) {
        navigate("/admin"); // Redirect Admins to dashboard
      } else {
        navigate("/shop"); // Redirect Users to shop
      }
    } catch (err) {
      // FIX: Catch the error from backend and display it
      setErrors({ form: err.message || "Invalid email or password" });
    } finally {
      setLoading(false);
    }
  };

  const formContent = (
    <form onSubmit={handleSubmit} className="login-form">
      {/* FIX: Displays the error message dynamically */}
      {errors.form && <div className="alert-error">{errors.form}</div>}

      <Input
        label="Email Address"
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
        placeholder="Enter your password"
        required
      />

      <Button type="submit" loading={loading} style={{ marginTop: "1rem" }}>
        Sign In
      </Button>
    </form>
  );

  if (noCard) return formContent;

  return <div className="auth-panel">{formContent}</div>;
};

export default LoginComponent;
