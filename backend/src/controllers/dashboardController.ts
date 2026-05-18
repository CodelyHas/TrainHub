import type { Request, Response } from "express";
import prisma from "../config/prisma.ts";

export const getDashboardSummary = async (_req: Request, res: Response) => {
  try {
    const [
      totalSchedules,
      totalPassengers,
      totalBookings,
      revenueResult,
      schedules,
    ] = await Promise.all([
      prisma.trainSchedule.count(),

      prisma.passenger.count(),

      prisma.reservation.count({
        where: {
          status: "CONFIRMED",
        },
      }),

      prisma.reservation.aggregate({
        where: {
          status: "CONFIRMED",
        },
        _sum: {
          totalPrice: true,
        },
      }),

      prisma.trainSchedule.findMany({
        orderBy: {
          id: "asc",
        },
        select: {
          id: true,
          trainName: true,
          departure: true,
          arrival: true,
          economyCapacity: true,
          businessCapacity: true,
          economyAvailableSeats: true,
          businessAvailableSeats: true,
        },
      }),
    ]);

    const occupancyByTrain = schedules.map((schedule) => {
      const capacity = schedule.economyCapacity + schedule.businessCapacity;

      const availableSeats =
        schedule.economyAvailableSeats + schedule.businessAvailableSeats;

      const occupiedSeats = capacity - availableSeats;

      const occupancyRate =
        capacity > 0
          ? Number(((occupiedSeats / capacity) * 100).toFixed(2))
          : 0;

      return {
        id: schedule.id,
        trainName: schedule.trainName,
        route: `${schedule.departure} → ${schedule.arrival}`,
        capacity,
        availableSeats,
        occupiedSeats,
        occupancyRate,

        economyCapacity: schedule.economyCapacity,
        businessCapacity: schedule.businessCapacity,
        economyAvailableSeats: schedule.economyAvailableSeats,
        businessAvailableSeats: schedule.businessAvailableSeats,
      };
    });

    return res.status(200).json({
      totalSchedules,
      totalPassengers,
      totalBookings,
      totalRevenue: revenueResult._sum.totalPrice || 0,
      occupancyByTrain,
    });
  } catch (error) {
    console.error("Error fetching dashboard summary:", error);

    return res.status(500).json({
      message: "Failed to fetch dashboard summary",
    });
  }
};