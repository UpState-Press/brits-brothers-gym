import { createRoot, hydrateRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./app/App.tsx";
import "./styles/index.css";

const container = document.getElementById("root");
if (!container) {
  throw new Error("Root element #root not found");
}

const app = (
  <HelmetProvider>
    <App />
  </HelmetProvider>
);

if (container.hasChildNodes()) {
  hydrateRoot(container, app);
} else {
  createRoot(container).render(app);
}
  