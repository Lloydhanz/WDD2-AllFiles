import AuthPage from "./pages/AuthPage";
import Landing from "./pages/Landing";
import AdminDashboard from "./pages/AdminDashboard";
import Shop from "./pages/Shop";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/about" element={<AboutUs />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/admin/*" element={<AdminDashboard />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
