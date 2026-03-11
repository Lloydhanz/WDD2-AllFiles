import { useState } from "react";
import Card from "../../components/Card";
import Button from "../../components/button";
import { useAuth } from "../../contexts/AuthContext";
import "./LoginComponent.css";
import { useNavigate } from "react-router-dom";

const LoginComponent = ({ noCard = false }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form);
      // Show a success notification and then navigate to inventory
      alert("Login successful");
      navigate("/inventory", { replace: true });
    } catch (err) {
      const msg = err?.message || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const content = (
    <>
      {error && <div className="auth-error">{error}</div>}
      <div className="form-title">SIGN IN</div>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
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
            placeholder="Enter your password"
            required
          />
        </div>
        <Button type="submit" loading={loading}>
          Login
        </Button>
      </form>
    </>
  );

  if (noCard) return content;

  return <Card title="Sign In">{content}</Card>;
};

export default LoginComponent;
