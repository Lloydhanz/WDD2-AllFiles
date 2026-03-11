const API_URL = "http://localhost:3000/api/auth";

export const inventoryService = {
  async create(productData) {
    const response = await fetch(`${API_URL}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Product Listing failed");
    }
    return data;
  },

  async update(productDatae, id) {
    const response = await fetch(`${API_URL}/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Product Update failed");
    }
    return data;
  },
};
