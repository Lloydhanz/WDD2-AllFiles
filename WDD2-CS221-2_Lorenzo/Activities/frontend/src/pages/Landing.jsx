import React from "react";
import Header from "../components/Header";
import Hero from "../components/Hero";
import "./Landing.css";
import MainContent from "../components/MainContent";
import Footer from "../components/Footer";

export default function Landing() {
  return (
    <div className="landing-page">
      <Header />
      <Hero
        title="Welcome to Retail Hub"
        description="Your ultimate destination for the best products at unbeatable prices."
        ButtonText="Shop Now"
        ButtonLink="/shop"
      />
      <MainContent />
      <Footer />
    </div>
  );
}
