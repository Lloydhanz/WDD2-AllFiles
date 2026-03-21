import React from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  useNavigate,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import Header from "../components/Header";
import Inventory from "./Inventory"; // Your existing "Add Product" form

// Import the 4 new components we just made
import AdminStats from "./AdminStats";
import AdminList from "./AdminList";
import AdminEdit from "./AdminEdit";
import AdminDelete from "./AdminDelete";

import "./AdminDashboard.css";

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (!user || (user.role !== "Admin" && user.role !== "Moderator")) {
      navigate("/");
    }
  }, [user, navigate]);

  if (!user || (user.role !== "Admin" && user.role !== "Moderator")) {
    return null;
  }

  return (
    <div className="admin-page">
      <Header />

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

      <div className="admin-main-content">
        <Routes>
          <Route path="/" element={<AdminStats />} />
          <Route
            path="/add"
            element={
              <div className="admin-content">
                <Inventory />
              </div>
            }
          />
          <Route path="/edit" element={<AdminEdit />} />
          <Route path="/delete" element={<AdminDelete />} />
          <Route path="/list" element={<AdminList />} />
        </Routes>
      </div>
    </div>
  );
}
