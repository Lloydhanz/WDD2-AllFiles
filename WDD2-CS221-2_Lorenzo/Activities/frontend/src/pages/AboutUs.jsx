import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "./AboutUs.css";

export default function AboutUs() {
  return (
    <div className="about-page">
      <Header />
      <main className="about-content">
        <section className="about-hero">
          <h1>About Us</h1>
          <p>Streamlining your business, one product at a time.</p>
        </section>

        <section className="about-details">
          <div className="about-card">
            <h2>Our Mission</h2>
            <p>
              At Retail Hub, we’re redefining how businesses manage and grow in
              the retail space. Our mission is to provide an all-in-one platform
              that simplifies inventory, sales, and customer management—making
              everyday operations faster, smarter, and more efficient. We aim to
              remove the complexity of retail processes, empowering
              entrepreneurs and businesses to focus on what truly matters:
              delivering great products, enhancing customer experiences, and
              scaling with confidence.
            </p>
          </div>
          <div className="about-card">
            <h2>Who We Are</h2>
            <p>
              We are a dedicated team of developers and retail experts
              passionate about building tools that make your life easier.
              Whether you are a small boutique or a growing warehouse, we are
              here to support your journey.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
