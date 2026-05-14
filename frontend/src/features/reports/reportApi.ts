import type { ReportFormData, ReportResponse } from "./reportTypes";
import API_URL from "../../config/api";

const REPORT_API_URL = `${API_URL}/reports`;
export async function generateReport(
  reportData: ReportFormData
): Promise<ReportResponse> {
  const response = await fetch(`${REPORT_API_URL}/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(reportData),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || result.error || "Failed to generate report"
    );
  }

  return result;
}