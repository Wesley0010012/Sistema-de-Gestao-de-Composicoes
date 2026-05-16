import { Navigate, Outlet } from "react-router-dom";

import { isAuthenticated } from "../../utils/auth/auth";

export function RequireAuth() {
  if (!isAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}
