import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Card from "../components/Card";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import Button from "../components/button";

export default function OrderHistory() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      const historyKey = `orderHistory_${user.username}`;
      const savedOrders = JSON.parse(localStorage.getItem(historyKey)) || [];
      setOrders(savedOrders);
    }
  }, [user]);

  if (!user) {
    return (
      <div style={{ textAlign: "center", padding: "5rem" }}>
        <h2>Please login to view your order history.</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
      }}
    >
      <Header />
      <main
        style={{
          flex: 1,
          maxWidth: "800px",
          margin: "0 auto",
          padding: "3rem 1rem",
          width: "100%",
        }}
      >
        <h1
          style={{
            marginBottom: "2rem",
            color: "var(--text-dark)",
            textAlign: "center",
          }}
        >
          Purchase History
        </h1>

        {orders.length === 0 ? (
          <Card>
            <div style={{ textAlign: "center", padding: "2rem" }}>
              <h3>You have no past purchases.</h3>
              <Link to="/shop">
                <Button style={{ marginTop: "1rem" }}>Start Shopping</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {orders.map((order) => (
              <Card key={order.id} title={`Order: ${order.id}`}>
                <div
                  style={{
                    borderBottom: "1px solid #eee",
                    paddingBottom: "1rem",
                    marginBottom: "1rem",
                  }}
                >
                  <p style={{ margin: "0.25rem 0" }}>
                    <strong>Date:</strong> {order.date}
                  </p>
                  <p style={{ margin: "0.25rem 0" }}>
                    <strong>Status:</strong>{" "}
                    <span
                      style={{
                        color: "var(--secondary-green)",
                        fontWeight: "bold",
                      }}
                    >
                      {order.status}
                    </span>
                  </p>
                  <p style={{ margin: "0.25rem 0" }}>
                    <strong>Total Paid:</strong> ${order.total.toFixed(2)}
                  </p>
                </div>

                <h4 style={{ marginBottom: "0.5rem" }}>Items:</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {order.items.map((item, index) => (
                    <li
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "0.5rem",
                        color: "var(--text-light)",
                      }}
                    >
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span style={{ fontWeight: "500" }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
