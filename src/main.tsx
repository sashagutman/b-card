import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./styles/global.css";
import "./styles/index.css";
import { SearchProvider } from "./context/SearchContext";

createRoot(document.getElementById("root")!).render(
  <SearchProvider>
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
  </SearchProvider>
);

