import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./context/AuthProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ProfileDataProvider } from "./context/ProfileDataProvider.jsx";
import { LabelDataProvider } from "./context/LabelProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProfileDataProvider>
        <LabelDataProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </LabelDataProvider>
      </ProfileDataProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
