export type ReportType = "all" | "booking" | "revenue" | "utilization";
export type ReportPeriod = "daily" | "weekly" | "monthly";

export type SeatClass = "ECONOMY" | "BUSINESS";
export type DiscountType = "NONE" | "CHILD" | "STUDENT";

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
  seatClass: SeatClass;
  seatCount: number;
  originalPrice: number;
  discountType: DiscountType;
  discountRate: number;
  totalPrice: number;
  status: string;
  bookingDate: string;
}

export interface RevenueReportRow {
  id: number;
  trainName: string;
  route: string;
  passengerName: string;
  seatClass: SeatClass;
  seatCount: number;
  ticketPrice: number;
  originalPrice: number;
  discountType: DiscountType;
  discountRate: number;
  totalPrice: number;
  bookingDate: string;
}

export interface UtilizationReportRow {
  id: number;
  trainName: string;
  route: string;

  economyCapacity: number;
  economyOccupiedSeats: number;
  economyAvailableSeats: number;

  businessCapacity: number;
  businessOccupiedSeats: number;
  businessAvailableSeats: number;

  totalCapacity: number;
  totalOccupiedSeats: number;
  totalAvailableSeats: number;
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