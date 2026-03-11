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
        title="Inventory Manager"
        description="Your one-stop solution for inventory management."
        ButtonText="Get Started"
        ButtonLink="/auth" // direct users to the authentication flow (login/register)
      />
      <MainContent />
      <Footer />
    </div>
  );
}
