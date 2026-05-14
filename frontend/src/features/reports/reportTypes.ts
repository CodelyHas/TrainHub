export type ReportType = "all" | "booking" | "revenue" | "utilization";
export type ReportPeriod = "daily" | "weekly" | "monthly";

export interface ReportFormData {
  reportType: ReportType;
  period: ReportPeriod;
  date: string;
}

export interface ReportSummary {
  totalBookings: number;
  confirmedBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
}

export interface BookingReportRow {
  id: number;
  passengerName: string;
  trainName: string;
  route: string;
  seatCount: number;
  totalPrice: number;
  status: string;
  bookingDate: string;
}

export interface RevenueReportRow {
  id: number;
  trainName: string;
  route: string;
  passengerName: string;
  seatCount: number;
  ticketPrice: number;
  totalPrice: number;
  bookingDate: string;
}

export interface UtilizationReportRow {
  id: number;
  trainName: string;
  route: string;
  capacity: number;
  occupiedSeats: number;
  availableSeats: number;
  utilizationRate: number;
}

export interface ReportResponse {
  message: string;
  reportType: ReportType;
  period: ReportPeriod;
  selectedDate: string;
  startDate: string;
  endDate: string;
  summary: ReportSummary;
  bookingReport: BookingReportRow[];
  revenueReport: RevenueReportRow[];
  utilizationReport: UtilizationReportRow[];
}