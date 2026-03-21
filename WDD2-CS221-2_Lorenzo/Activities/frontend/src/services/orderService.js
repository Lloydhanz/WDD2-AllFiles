const API_BASE = "http://localhost:3000/api/orders";

export async function createOrder(orderData) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to create order");
  return data;
}

export async function getUserOrders() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE}/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to fetch orders");
  return data;
}
