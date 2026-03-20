import React from "react";
import "./MainContent.css";

export default function MainContent() {
  const features = [
    {
      id: 1,
      title: "Wide Selection",
      description: "Browse thousands of products across multiple categories.",
    },
    {
      id: 2,
      title: "Fast Shipping",
      description:
        "Get your items delivered quickly and securely to your doorstep.",
    },
    {
      id: 3,
      title: "Secure Checkout",
      description:
        "Shop with confidence using our encrypted and secure payment systems.",
    },
  ];
  return (
    <div>
      <main className="content-wrapper">
        <section className="intro-section">
          <h2>Discover Our Collections</h2>
          <p>Everything you need, right at your fingertips.</p>
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
