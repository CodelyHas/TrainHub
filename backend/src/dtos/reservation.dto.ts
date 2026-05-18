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
  originalPrice: number,
  discountType: "NONE" | "CHILD" | "STUDENT",
  discountRate: number,
  totalPrice: number
) => {
  return {
    passengerId,
    scheduleId: Number(data.scheduleId),
    seatClass: data.seatClass,
    seatCount: Number(data.seatCount),
    originalPrice,
    discountType,
    discountRate,
    totalPrice,
  };
};

export const formatReservationResponse = (
  reservation: ReservationWithDetails
) => {
  return {
    id: reservation.id,
    passengerName: reservation.passenger.fullName,
    nationalId: reservation.passenger.nationalId,
    ageGroup: reservation.passenger.ageGroup,
    isStudent: reservation.passenger.isStudent,
    trainName: reservation.schedule.trainName,
    departure: reservation.schedule.departure,
    arrival: reservation.schedule.arrival,
    departureTime: reservation.schedule.departureTime,
    arrivalTime: reservation.schedule.arrivalTime,
    seatClass: reservation.seatClass,
    seatCount: reservation.seatCount,
    originalPrice: reservation.originalPrice,
    discountType: reservation.discountType,
    discountRate: reservation.discountRate,
    totalPrice: reservation.totalPrice,
    status: reservation.status,
    createdAt: reservation.createdAt,
  };
};