import { Navigate, Route, Routes } from "react-router-dom";

import LoginView from "../views/Login/LoginView";
import RegisterView from "../views/Register/RegisterView";
import DashboardView from "../views/Dashboard/DashboardView";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/login" element={<LoginView />} />

      <Route path="/register" element={<RegisterView />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardView />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;