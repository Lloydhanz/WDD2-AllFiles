import React from "react";
import "./MainContent.css";

export default function MainContent() {
  const features = [
    {
      id: 1,
      title: "Real-time Tracking",
      description:
        "Monitor your inventory levels in real-time and receive instant updates.",
    },
    {
      id: 2,
      title: "Automated Alerts",
      description:
        "Get notified when stock levels are low or when it's time to reorder.",
    },
    {
      id: 3,
      title: "Detailed Reporting",
      description:
        "Generate comprehensive reports to analyze inventory trends and make informed decisions.",
    },
  ];
  return (
    <div>
      <main className="content-wrapper">
        <section className="intro-section">
          <h2>Welcome to Inventory Manager</h2>
          <p>Your one-stop solution for inventory management.</p>
        </section>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className="feature-card">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
