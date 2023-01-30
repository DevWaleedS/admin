import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import ContextProvider from "./store/ContextProvider";
import NotificationProvider from "./store/NotificationProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextProvider>
    <NotificationProvider>
      <App />
      </NotificationProvider>
    </ContextProvider>
  </React.StrictMode>
);
