import { Navigate } from "react-router-dom";
import { isAdmin } from "../features/auth/authStorage";

function DashboardRedirect() {
  if (isAdmin()) {
    return <Navigate to="/dashboard/admin-dashboard" replace />;
  }

  return <Navigate to="/dashboard/manage-reservations" replace />;
}

export default DashboardRedirect;