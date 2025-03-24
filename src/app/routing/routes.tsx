import { Routes, Route } from "react-router-dom";

import { AuthPage } from "../../pages/AuthPage";
import { ChatPage } from "../../pages/ChatPage";
import { NotFoundPage } from "../../pages/NotFoundPage";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
