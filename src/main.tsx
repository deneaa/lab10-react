import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";

import DocsProvider from "./context/DocsContext/DocsProvider";
import AuthProvider from "./context/AuthContext/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DocsProvider>
          <App />
        </DocsProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
