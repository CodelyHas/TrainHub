import type ReportDTO from "../types/reportTypes.ts";

export const createReportDTO = (data: ReportDTO) => {
  return {
    reportType: data.reportType || "all",
    period: data.period,
    date: data.date,
  };
};

export const formatBookingReportRow = (reservation: any) => {
  return {
    id: reservation.id,
    passengerName: reservation.passenger.fullName,
    trainName: reservation.schedule.trainName,
    route: `${reservation.schedule.departure} → ${reservation.schedule.arrival}`,
    seatClass: reservation.seatClass,
    seatCount: reservation.seatCount,
    originalPrice: reservation.originalPrice,
    discountType: reservation.discountType,
    discountRate: reservation.discountRate,
    totalPrice: reservation.totalPrice,
    status: reservation.status,
    bookingDate: reservation.createdAt,
  };
};

export const formatRevenueReportRow = (reservation: any) => {
  const ticketPrice =
    reservation.seatClass === "BUSINESS"
      ? reservation.schedule.businessPrice
      : reservation.schedule.economyPrice;

  return {
    id: reservation.id,
    trainName: reservation.schedule.trainName,
    route: `${reservation.schedule.departure} → ${reservation.schedule.arrival}`,
    passengerName: reservation.passenger.fullName,
    seatClass: reservation.seatClass,
    seatCount: reservation.seatCount,
    ticketPrice,
    originalPrice: reservation.originalPrice,
    discountType: reservation.discountType,
    discountRate: reservation.discountRate,
    totalPrice: reservation.totalPrice,
    bookingDate: reservation.createdAt,
  };
};

export const formatUtilizationReportRow = (
  schedule: any,
  economyOccupiedSeats: number,
  businessOccupiedSeats: number
) => {
  const economyAvailableSeats =
    schedule.economyCapacity - economyOccupiedSeats;

  const businessAvailableSeats =
    schedule.businessCapacity - businessOccupiedSeats;

  const totalCapacity =
    schedule.economyCapacity + schedule.businessCapacity;

  const totalOccupiedSeats =
    economyOccupiedSeats + businessOccupiedSeats;

  const totalAvailableSeats =
    economyAvailableSeats + businessAvailableSeats;

  const utilizationRate =
    totalCapacity > 0
      ? Number(((totalOccupiedSeats / totalCapacity) * 100).toFixed(2))
      : 0;

  return {
    id: schedule.id,
    trainName: schedule.trainName,
    route: `${schedule.departure} → ${schedule.arrival}`,

    economyCapacity: schedule.economyCapacity,
    economyOccupiedSeats,
    economyAvailableSeats,

    businessCapacity: schedule.businessCapacity,
    businessOccupiedSeats,
    businessAvailableSeats,

    totalCapacity,
    totalOccupiedSeats,
    totalAvailableSeats,
    utilizationRate,
  };
};