import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import DesignsProvider from "./context/DesignContext.jsx";
import ModalProvider from "./context/ModalContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";
import "./TailwindConstants.jsx";

createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DesignsProvider>
          <ModalProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ModalProvider>
        </DesignsProvider>
      </AuthProvider>
    </BrowserRouter>
  // </React.StrictMode>  
);
