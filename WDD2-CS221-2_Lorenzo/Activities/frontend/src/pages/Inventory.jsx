import Card from "../components/Card";
import Button from "../components/button";
import Input from "../components/Input";
import "./Login.css";
import { useState, useEffect } from "react";
import TextArea from "../components/TextArea";
import slugify from "slugify";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { createProduct } from "../services/productService";

const Inventory = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    imageUrl: "", // NEW: Added to state
  });
  const [errors, setErrors] = useState({});
  const [notif, setNotif] = useState("");
  const [loading, setLoading] = useState(false);
  const [slug, setSlug] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev_) => ({ ...prev_, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    if (!formData.name) {
      setErrors({ name: "Name is required" });
      return;
    }
    setLoading(true);
    try {
      await createProduct({
        name: formData.name,
        slug: slug,
        description: formData.description,
        price: Number(formData.price),
        imageUrl: formData.imageUrl, // NEW: send image to backend
      });
      setNotif("Product successfully added!");
      setFormData({ name: "", description: "", price: 0, imageUrl: "" });
    } catch (err) {
      setErrors({ form: err.message || "Failed to create product" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const generatedSlug = slugify(formData.name, {
      lower: true,
      strict: true,
    });
    setSlug(generatedSlug);
  }, [formData.name]);

  useEffect(() => {
    if (!user) {
      alert("You must be logged in to access this page.");
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <Card title="Create Product">
      {notif && (
        <div
          style={{ color: "green", marginBottom: "1rem", textAlign: "center" }}
        >
          {notif}
        </div>
      )}
      {errors.form && <div className="alert-error">{errors.form}</div>}
      <form onSubmit={handleSubmit} className="login-form">
        <Input
          label="Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          placeholder="Enter product name"
          required
        />
        <Input label="Slug" type="text" name="slug" value={slug} disabled />
        <Input
          label="Image URL (Link)"
          type="url"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.png"
        />
        <TextArea
          label="Description"
          name="description"
          rows={5}
          value={formData.description}
          onChange={handleChange}
        ></TextArea>
        <Input
          label="Price"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          error={errors.price}
          min="0"
          step="0.01"
          required
        />
        <Button type="submit" loading={loading} style={{ marginTop: "1rem" }}>
          Add Product
        </Button>
      </form>
    </Card>
  );
};

export default Inventory;
