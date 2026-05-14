type ReportType = "all" | "booking" | "revenue" | "utilization";
type ReportPeriod = "daily" | "weekly" | "monthly";

export interface ReportDTO {
  reportType: ReportType;
  period: ReportPeriod;
  date: string;
}

export default ReportDTO;