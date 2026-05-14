import { useState } from "react";
import toast from "react-hot-toast";

import ReportFilter from "../components/reports/ReportFilter";
import ReportSummaryCards from "../components/reports/ReportSummaryCards";
import BookingReportTable from "../components/reports/BookingReportTable";
import RevenueReportTable from "../components/reports/RevenueReportTable";
import UtilizationReportTable from "../components/reports/UtilizationReportTable";

import { generateReport } from "../features/reports/reportApi";
import type {
  ReportFormData,
  ReportResponse,
  ReportType,
} from "../features/reports/reportTypes";

function ReportsPage() {
  const [reportData, setReportData] = useState<ReportResponse | null>(null);
  const [selectedReportType, setSelectedReportType] =
    useState<ReportType>("all");
  const [loading, setLoading] = useState(false);

  const handleGenerateReport = async (data: ReportFormData) => {
    try {
      setLoading(true);

      const result = await generateReport(data);

      setReportData(result);
      setSelectedReportType(data.reportType);

      toast.success(result.message || "Report generated successfully");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while generating the report";

      toast.error(message);
      console.error("Failed to generate report:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Reports & Analytics
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Generate booking, revenue, and train utilization reports to support
          administrative decision-making.
        </p>
      </div>

      <ReportFilter
        loading={loading}
        onGenerate={handleGenerateReport}
      />

      <ReportSummaryCards summary={reportData?.summary} />

      <div className="mt-6 grid grid-cols-1 gap-6">
        {(selectedReportType === "all" ||
          selectedReportType === "booking") && (
          <BookingReportTable rows={reportData?.bookingReport || []} />
        )}

        {(selectedReportType === "all" ||
          selectedReportType === "revenue") && (
          <RevenueReportTable rows={reportData?.revenueReport || []} />
        )}

        {(selectedReportType === "all" ||
          selectedReportType === "utilization") && (
          <UtilizationReportTable rows={reportData?.utilizationReport || []} />
        )}
      </div>
    </div>
  );
}

export default ReportsPage;