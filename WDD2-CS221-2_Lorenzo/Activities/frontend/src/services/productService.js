const API_BASE = "http://localhost:3000/api/inventory";

export async function createProduct(product) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(product),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.message || "Failed to create product");
  return data;
}

export async function getAllProducts() {
  const response = await fetch(`${API_BASE}/`);
  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.message || "Failed to fetch products");
  return data;
}

export async function updateProduct(id, productData) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/update/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(productData),
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.message || "Failed to update product");
  return data;
}

export async function deleteProduct(id) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/delete/${id}`, {
    method: "DELETE",
    headers: {
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
  });
  const data = await response.json();
  if (!response.ok)
    throw new Error(data?.message || "Failed to delete product");
  return data;
}
