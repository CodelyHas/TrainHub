import type { Request, Response } from "express";
import prisma from "../config/prisma.ts";
import type ReportDTO from "../types/reportTypes.ts";
import {
  createReportDTO,
  formatBookingReportRow,
  formatRevenueReportRow,
  formatUtilizationReportRow,
} from "../dtos/report.dto.ts";

function getDateRange(period: string, date: string) {
  const startDate = new Date(date);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);

  if (period === "daily") {
    endDate.setDate(startDate.getDate() + 1);
  }

  if (period === "weekly") {
    const day = startDate.getDay();

    startDate.setDate(startDate.getDate() - day);
    startDate.setHours(0, 0, 0, 0);

    endDate.setTime(startDate.getTime());
    endDate.setDate(startDate.getDate() + 7);
  }

  if (period === "monthly") {
    startDate.setDate(1);
    startDate.setHours(0, 0, 0, 0);

    endDate.setTime(startDate.getTime());
    endDate.setMonth(startDate.getMonth() + 1);
  }

  return { startDate, endDate };
}

export const generateReport = async (req: Request, res: Response) => {
  try {
    const reportData = createReportDTO(req.body as ReportDTO);

    const { reportType, period, date } = reportData;
    const { startDate, endDate } = getDateRange(period, date);

    const reservations = await prisma.reservation.findMany({
      where: {
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      include: {
        passenger: true,
        schedule: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const confirmedReservations = reservations.filter(
      (reservation) => reservation.status === "CONFIRMED"
    );

    const cancelledReservations = reservations.filter(
      (reservation) => reservation.status === "CANCELLED"
    );

    const totalRevenue = confirmedReservations.reduce(
      (total, reservation) => total + reservation.totalPrice,
      0
    );

    const schedules = await prisma.trainSchedule.findMany({
      orderBy: {
        id: "asc",
      },
    });

    const utilizationReport = schedules.map((schedule) => {
      const economyOccupiedSeats = confirmedReservations
        .filter(
          (reservation) =>
            reservation.scheduleId === schedule.id &&
            reservation.seatClass === "ECONOMY"
        )
        .reduce((total, reservation) => total + reservation.seatCount, 0);

      const businessOccupiedSeats = confirmedReservations
        .filter(
          (reservation) =>
            reservation.scheduleId === schedule.id &&
            reservation.seatClass === "BUSINESS"
        )
        .reduce((total, reservation) => total + reservation.seatCount, 0);

      return formatUtilizationReportRow(
        schedule,
        economyOccupiedSeats,
        businessOccupiedSeats
      );
    });

    return res.status(200).json({
      message: "Report generated successfully",
      reportType,
      period,
      selectedDate: date,
      startDate,
      endDate,
      summary: {
        totalBookings: reservations.length,
        confirmedBookings: confirmedReservations.length,
        cancelledBookings: cancelledReservations.length,
        totalRevenue,
      },
      bookingReport:
        reportType === "all" || reportType === "booking"
          ? reservations.map(formatBookingReportRow)
          : [],
      revenueReport:
        reportType === "all" || reportType === "revenue"
          ? confirmedReservations.map(formatRevenueReportRow)
          : [],
      utilizationReport:
        reportType === "all" || reportType === "utilization"
          ? utilizationReport
          : [],
    });
  } catch (error) {
    console.error("Error generating report:", error);

    return res.status(500).json({
      message: "Failed to generate report",
    });
  }
};