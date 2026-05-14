import type ReservationDTO from "../types/reservationTypes";
import type { Prisma } from "@prisma/client";

const reservationInclude = {
  passenger: true,
  schedule: true,
} satisfies Prisma.ReservationInclude;

export type ReservationWithDetails = Prisma.ReservationGetPayload<{
  include: typeof reservationInclude;
}>;

export const createReservationDTO = (
  data: ReservationDTO,
  passengerId: number,
  totalPrice: number
) => {
  return {
    passengerId,
    scheduleId: Number(data.scheduleId),
    seatCount: Number(data.seatCount),
    totalPrice,
  };
};

export const formatReservationResponse = (
  reservation: ReservationWithDetails
) => {
  return {
    id: reservation.id,
    passengerName: reservation.passenger.fullName,
    trainName: reservation.schedule.trainName,
    departure: reservation.schedule.departure,
    arrival: reservation.schedule.arrival,
    departureTime: reservation.schedule.departureTime,
    arrivalTime: reservation.schedule.arrivalTime,
    seatCount: reservation.seatCount,
    totalPrice: reservation.totalPrice,
    status: reservation.status,
    createdAt: reservation.createdAt,
  };
};