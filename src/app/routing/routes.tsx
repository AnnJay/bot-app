import { Routes, Route, Navigate } from "react-router-dom";
import { useUnit } from "effector-react";

import { AuthPage } from "../../pages/AuthPage";
import { ChatPage } from "../../pages/ChatPage";
import { NotFoundPage } from "../../pages/NotFoundPage";
import { $userState } from "../store/userStore";

export const AppRoutes = () => {
  const { user } = useUnit($userState);

  return (
    <Routes>
      <Route path="/" element={user ? <ChatPage /> : <Navigate to="auth" />} />
      <Route path="/auth" element={user ? <Navigate to="/" /> : <AuthPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
