import { useState } from "react";
import "./Login.css";
import "../components/auth/LoginComponent.css";
import "../components/auth/RegisterComponent.css";
import LoginComponent from "../components/auth/LoginComponent";
import RegisterComponent from "../components/auth/RegisterComponent";
import Card from "../components/Card";

const AuthPage = () => {
  const [active, setActive] = useState("login");

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <Card title={active === "login" ? "SIGN IN" : "SIGN UP"}>
          <div className="auth-card-wrapper">
            <div className="auth-tabs" role="tablist">
              <button
                className={`tab ${active === "login" ? "active" : ""}`}
                onClick={() => setActive("login")}
                role="tab"
                aria-selected={active === "login"}
              >
                Login
              </button>
              <button
                className={`tab ${active === "register" ? "active" : ""}`}
                onClick={() => setActive("register")}
                role="tab"
                aria-selected={active === "register"}
              >
                Register
              </button>
            </div>
            {active === "login" ? (
              <LoginComponent noCard />
            ) : (
              <RegisterComponent noCard />
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
