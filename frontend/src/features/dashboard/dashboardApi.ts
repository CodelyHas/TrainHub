import { getAuthHeaders } from "../auth/authHeaders";
import type { DashboardSummary } from "./dashboardTypes";

const DASHBOARD_API_URL = "http://localhost:3000/dashboard";

export const fetchDashboardSummary = async (): Promise<DashboardSummary> => {
  const response = await fetch(`${DASHBOARD_API_URL}/summary`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || data.error || "Failed to fetch dashboard summary"
    );
  }

  return data;
};