import { useAuth } from "@/features/AUTH/context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export function RequireAuth() {
  const { user } = useAuth();
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
export function RedirectIfAuth() {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : <Outlet />;
}