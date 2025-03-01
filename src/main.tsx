import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import AppRouter from "./router/AppRouter";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Elemento de ID 'root' no encontrado");
}

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </StrictMode>
);
