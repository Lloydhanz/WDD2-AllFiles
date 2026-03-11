// Base API URL is read from environment (VITE_API_BASE_URL) for flexibility.
// Fallback to the local backend's v1 API root if not provided.
const API_BASE = import.meta && import.meta.env && import.meta.env.VITE_API_BASE_URL
  ? import.meta.env.VITE_API_BASE_URL
  : "http://localhost:3000/api/v1";

// Full endpoint for creating products will be `${API_BASE}/products/create`

export async function createProduct(product) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/products/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Failed to create product");
  }
  return data;
}
