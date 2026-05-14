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
    seatCount: reservation.seatCount,
    totalPrice: reservation.totalPrice,
    status: reservation.status,
    bookingDate: reservation.createdAt,
  };
};

export const formatRevenueReportRow = (reservation: any) => {
  return {
    id: reservation.id,
    trainName: reservation.schedule.trainName,
    route: `${reservation.schedule.departure} → ${reservation.schedule.arrival}`,
    passengerName: reservation.passenger.fullName,
    seatCount: reservation.seatCount,
    ticketPrice: reservation.schedule.price,
    totalPrice: reservation.totalPrice,
    bookingDate: reservation.createdAt,
  };
};

export const formatUtilizationReportRow = (schedule: any, occupiedSeats: number) => {
  const utilizationRate =
    schedule.capacity > 0
      ? Number(((occupiedSeats / schedule.capacity) * 100).toFixed(2))
      : 0;

  return {
    id: schedule.id,
    trainName: schedule.trainName,
    route: `${schedule.departure} → ${schedule.arrival}`,
    capacity: schedule.capacity,
    occupiedSeats,
    availableSeats: schedule.capacity - occupiedSeats,
    utilizationRate,
  };
};