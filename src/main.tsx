import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { AppRoutes } from "./app/routing/routes.tsx";
import { AppStateProvider } from "./app/providers/AppStateProvider.tsx";
import { RouterProvider } from "./app/providers/RouterProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppStateProvider>
      <RouterProvider>
        <AppRoutes />
      </RouterProvider>
    </AppStateProvider>
  </StrictMode>
);
