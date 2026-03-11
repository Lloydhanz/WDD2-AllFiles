import AuthPage from "./pages/AuthPage";
import Landing from "./pages/Landing";
import Inventory from "./pages/Inventory";
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
          <Route path="/inventory" element={<Inventory />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
