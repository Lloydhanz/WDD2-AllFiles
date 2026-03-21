import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();

  // ✅ SAFE INITIAL LOAD
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");

      if (!savedCart) return [];

      const parsed = JSON.parse(savedCart);

      // 🔥 Ensure it's always an array
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      console.error("Failed to load cart from storage:", error);
      return [];
    }
  });

  // ✅ ALWAYS SAVE SAFE DATA
  useEffect(() => {
    if (Array.isArray(cart)) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }, [cart]);

  useEffect(() => {
    if (!user) {
      setCart([]);
    }
  }, [user]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const safePrev = Array.isArray(prevCart) ? prevCart : [];

      const existingItem = safePrev.find((item) => item._id === product._id);

      if (existingItem) {
        return safePrev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...safePrev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => {
      const safePrev = Array.isArray(prevCart) ? prevCart : [];
      return safePrev.filter((item) => item._id !== productId);
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;

    setCart((prevCart) => {
      const safePrev = Array.isArray(prevCart) ? prevCart : [];

      return safePrev.map((item) =>
        item._id === productId ? { ...item, quantity } : item,
      );
    });
  };

  const clearCart = () => setCart([]);

  const safeCart = Array.isArray(cart) ? cart : [];

  const cartTotal = safeCart.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0,
  );

  const cartCount = safeCart.reduce(
    (count, item) => count + (item.quantity || 0),
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart: safeCart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
