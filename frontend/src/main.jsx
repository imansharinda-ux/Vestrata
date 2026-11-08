import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles/base.css";
import "./styles/animations.css";
import "./styles/components.css";
import "./styles/sections.css";
import "./styles/login.css";
import "./styles/app-navbar.css";
import "./styles/analyze.css";
import "./styles/listings.css";
import "./styles/compare.css";
import "./styles/alerts.css";
import "./styles/rules.css";
import "./styles/profile.css";
import "./styles/contact.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
