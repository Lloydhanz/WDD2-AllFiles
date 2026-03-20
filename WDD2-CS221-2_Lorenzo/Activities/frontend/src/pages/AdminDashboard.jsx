import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  useNavigate,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Header from "../components/Header";
import Inventory from "./Inventory"; // Re-using your create form here
import "./AdminDashboard.css";

// Placeholder components for the admin tabs
const AdminStats = () => (
  <div className="admin-content">
    <h2>Dashboard Stats</h2>
    <p>Overview of sales and active users will go here.</p>
  </div>
);
const AdminAdd = () => (
  <div className="admin-content">
    <Inventory />
  </div>
);
const AdminEdit = () => (
  <div className="admin-content">
    <h2>Edit Product</h2>
    <p>Product edit table goes here.</p>
  </div>
);
const AdminDelete = () => (
  <div className="admin-content">
    <h2>Delete Product</h2>
    <p>Product deletion controls go here.</p>
  </div>
);
const AdminList = () => (
  <div className="admin-content">
    <h2>Inventory List</h2>
    <p>Full grid of all products goes here.</p>
  </div>
);

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect if not logged in. Later, add role check: if (user?.role !== 'Admin') navigate("/");
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="admin-page">
      <Header />

      {/* Admin Sub-Navbar */}
      <div className="admin-navbar">
        <div className="admin-nav-container">
          <Link
            to="/admin"
            className={location.pathname === "/admin" ? "active" : ""}
          >
            Stats Home
          </Link>
          <Link
            to="/admin/add"
            className={location.pathname === "/admin/add" ? "active" : ""}
          >
            Add Product
          </Link>
          <Link
            to="/admin/edit"
            className={location.pathname === "/admin/edit" ? "active" : ""}
          >
            Edit Product
          </Link>
          <Link
            to="/admin/delete"
            className={location.pathname === "/admin/delete" ? "active" : ""}
          >
            Delete Product
          </Link>
          <Link
            to="/admin/list"
            className={location.pathname === "/admin/list" ? "active" : ""}
          >
            Inventory List
          </Link>
        </div>
      </div>

      {/* Admin Content Area */}
      <div className="admin-main-content">
        <Routes>
          <Route path="/" element={<AdminStats />} />
          <Route path="/add" element={<AdminAdd />} />
          <Route path="/edit" element={<AdminEdit />} />
          <Route path="/delete" element={<AdminDelete />} />
          <Route path="/list" element={<AdminList />} />
        </Routes>
      </div>
    </div>
  );
}
