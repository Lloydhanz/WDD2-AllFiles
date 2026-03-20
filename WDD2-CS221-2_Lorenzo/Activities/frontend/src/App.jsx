import AuthPage from "./pages/AuthPage";
import Landing from "./pages/Landing";
import AdminDashboard from "./pages/AdminDashboard";
import Shop from "./pages/Shop";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import OrderHistory from "./pages/OrderHistory"; // IMPORT NEW PAGE
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<AboutUs />} />
            {/* Protected User Routes */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/history" element={<OrderHistory />} />{" "}
            {/* NEW ROUTE */}
            {/* Protected Admin Routes */}
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
