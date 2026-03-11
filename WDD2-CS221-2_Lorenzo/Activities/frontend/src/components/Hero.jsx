import React from "react";
import Button from "./button";
import { Link } from "react-router-dom";
import "./Hero.css";

export default function Hero({ title, description, ButtonText, ButtonLink }) {
  return (
    <div>
      <section className="hero-container">
        <div className="hero-content">
          <h1>{title}</h1>
          <p>{description}</p>
          {ButtonLink ? (
            <Link to={ButtonLink}>
              <Button variant="primary" type="button">
                {ButtonText}
              </Button>
            </Link>
          ) : (
            <Button variant="primary" type="button">
              {ButtonText}
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
