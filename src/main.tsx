import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Routes } from "./routes";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/auth/provider";

const client = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <AuthProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>
);
