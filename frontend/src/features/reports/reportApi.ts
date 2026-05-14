import type { ReportFormData, ReportResponse } from "./reportTypes";

export async function generateReport(
  reportData: ReportFormData
): Promise<ReportResponse> {
  const response = await fetch("http://localhost:3000/reports/generate", {
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