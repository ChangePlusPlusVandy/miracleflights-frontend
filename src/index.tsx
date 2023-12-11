import Router from "./layout/Router.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>,
);
