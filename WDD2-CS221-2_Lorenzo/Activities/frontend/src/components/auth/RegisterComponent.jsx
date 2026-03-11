import { useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/button";
import { useAuth } from "../../contexts/AuthContext";
import "./RegisterComponent.css";
import { useNavigate } from "react-router-dom";

const RegisterComponent = ({ noCard = false }) => {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    confirm: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      await register({
        username: form.username,
        name: form.name,
        email: form.email,
        password: form.password,
      });
      // After successful registration, show a success message and redirect to login
      alert("Sign up successful. Please login.");
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <>
      {error && <div className="auth-error">{error}</div>}
      <div className="form-title">SIGN UP</div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Username</label>
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Choose a username"
            required
          />
        </div>
        <div className="form-field">
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full name"
            required
          />
        </div>
        <div className="form-field">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="name@example.com"
            required
          />
        </div>
        <div className="form-field">
          <label>Password</label>
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password (min 8 characters)"
            required
          />
        </div>
        <div className="form-field">
          <label>Confirm</label>
          <input
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>
        <Button type="submit" loading={loading}>
          Register
        </Button>
      </form>
    </>
  );

  if (noCard) return content;

  return <Card title="Create Account">{content}</Card>;
};

export default RegisterComponent;
