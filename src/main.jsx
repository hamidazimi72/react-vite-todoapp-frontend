import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { MainLayout } from "./components/layout/main-layout";
import { App } from "./components/page/home";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainLayout>
      <App />
    </MainLayout>
  </StrictMode>
);
