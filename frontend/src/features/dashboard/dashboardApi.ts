import { getAuthHeaders } from "../auth/authHeaders";
import type { DashboardSummary } from "./dashboardTypes";
import API_URL from "../../config/api";

const DASHBOARD_API_URL = `${API_URL}/dashboard`;

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