import type { Request, Response } from "express";
import prisma from "../config/prisma.ts";
import type ReservationDTO from "../types/reservationTypes";
import {
  createReservationDTO,
  formatReservationResponse,
} from "../dtos/reservation.dto.ts";

const getDiscountDetails = (ageGroup: string, isStudent: boolean) => {
  if (ageGroup === "CHILD") {
    return {
      discountType: "CHILD" as const,
      discountRate: 0.5,
    };
  }

  if (isStudent) {
    return {
      discountType: "STUDENT" as const,
      discountRate: 0.2,
    };
  }

  return {
    discountType: "NONE" as const,
    discountRate: 0,
  };
};

export const createReservation = async (req: Request, res: Response) => {
  try {
    const reservationData = req.body as ReservationDTO;
    const seatCount = Number(reservationData.seatCount);
    const isBusiness = reservationData.seatClass === "BUSINESS";

    const passenger = await prisma.passenger.findUnique({
      where: {
        nationalId: reservationData.nationalId,
      },
    });

    if (!passenger) {
      return res.status(404).json({
        error: "Passenger not found",
      });
    }

    const schedule = await prisma.trainSchedule.findUnique({
      where: {
        id: Number(reservationData.scheduleId),
      },
    });

    if (!schedule) {
      return res.status(404).json({
        error: "Train schedule not found",
      });
    }

    if (schedule.departureTime <= new Date()) {
      return res.status(400).json({
        error: "This train has already departed",
      });
    }

    const selectedAvailableSeats = isBusiness
      ? schedule.businessAvailableSeats
      : schedule.economyAvailableSeats;

    const selectedPrice = isBusiness
      ? schedule.businessPrice
      : schedule.economyPrice;

    if (selectedAvailableSeats < seatCount) {
      return res.status(400).json({
        error: `Not enough ${reservationData.seatClass.toLowerCase()} seats available`,
      });
    }

    const originalPrice = selectedPrice * seatCount;

    const { discountType, discountRate } = getDiscountDetails(
      passenger.ageGroup,
      passenger.isStudent
    );

    const totalPrice = originalPrice * (1 - discountRate);

    const reservation = await prisma.$transaction(async (tx) => {
      const createdReservation = await tx.reservation.create({
        data: createReservationDTO(
          reservationData,
          passenger.id,
          originalPrice,
          discountType,
          discountRate,
          totalPrice
        ),
        include: {
          passenger: true,
          schedule: true,
        },
      });

      await tx.trainSchedule.update({
        where: {
          id: schedule.id,
        },
        data: isBusiness
          ? {
              businessAvailableSeats: selectedAvailableSeats - seatCount,
            }
          : {
              economyAvailableSeats: selectedAvailableSeats - seatCount,
            },
      });

      return createdReservation;
    });

    return res.status(201).json({
      message: "Reservation created successfully",
      reservation: formatReservationResponse(reservation),
    });
  } catch (error) {
    console.error("Error creating reservation:", error);

    return res.status(500).json({
      error: "Failed to create reservation",
    });
  }
};

export const getReservations = async (_req: Request, res: Response) => {
  try {
    const reservations = await prisma.reservation.findMany({
      include: {
        passenger: true,
        schedule: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedReservations = reservations.map(formatReservationResponse);

    return res.json(formattedReservations);
  } catch (error) {
    console.error("Error fetching reservations:", error);

    return res.status(500).json({
      error: "Failed to fetch reservations",
    });
  }
};

export const cancelReservation = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: {
        passenger: true,
        schedule: true,
      },
    });

    if (!reservation) {
      return res.status(404).json({
        error: "Reservation not found",
      });
    }

    if (reservation.status === "CANCELLED") {
      return res.status(400).json({
        error: "Reservation is already cancelled",
      });
    }

    const updatedReservation = await prisma.$transaction(async (tx) => {
      const cancelledReservation = await tx.reservation.update({
        where: { id },
        data: {
          status: "CANCELLED",
        },
        include: {
          passenger: true,
          schedule: true,
        },
      });

      await tx.trainSchedule.update({
        where: {
          id: reservation.scheduleId,
        },
        data:
          reservation.seatClass === "BUSINESS"
            ? {
                businessAvailableSeats: {
                  increment: reservation.seatCount,
                },
              }
            : {
                economyAvailableSeats: {
                  increment: reservation.seatCount,
                },
              },
      });

      return cancelledReservation;
    });

    return res.json({
      message: "Reservation cancelled successfully",
      reservation: formatReservationResponse(updatedReservation),
    });
  } catch (error) {
    console.error("Error cancelling reservation:", error);

    return res.status(500).json({
      error: "Failed to cancel reservation",
    });
  }
};