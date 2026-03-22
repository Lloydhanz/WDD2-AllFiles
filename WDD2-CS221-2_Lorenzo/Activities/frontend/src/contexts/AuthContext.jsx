import { createContext, useContext, useState, useEffect } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);

    const userObj = data.user
      ? data.user
      : data.username || data._id
        ? {
            id: data._id || null,
            fullName: data.fullName || "",
            email: data.email || "",
            username: data.username || null,
            role: data.role || "User",
          }
        : null;

    if (data?.token) localStorage.setItem("token", data.token);
    if (userObj) localStorage.setItem("user", JSON.stringify(userObj));

    setUser(userObj);

    return userObj;
  };

  const register = async (userData) => {
    const data = await authService.register(userData);
    return data;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
