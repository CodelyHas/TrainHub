import { createScheduleDTO, updateScheduleDTO, } from "../dtos/schedule.dto.ts";
import prisma from "../config/prisma.ts"
import type { Request, Response } from "express";

export const sendScheduleData = async (req:Request, res:Response) => {
  try {
    const schedule = createScheduleDTO(req.body);
    const createdSchedule = await prisma.trainSchedule.create({ data: schedule })

    // send response back
    res.json(createdSchedule);
  } catch (error) {
    console.error(error);

    // always handle error
    res.status(500).json({ error: "Failed to create schedule" });
  }
};

export const getScheduleData = async (_req:Request, res:Response) => {
  try {
    const schedules = await prisma.trainSchedule.findMany({
      orderBy: {
        departureTime: "asc",
      },
    });

    res.json(schedules);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch schedules" });
  }
};

export const updateScheduleData = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const existingSchedule = await prisma.trainSchedule.findUnique({
      where: { id },
    });

    if (!existingSchedule) {
      return res.status(404).json({
        error: "Schedule not found",
      });
    }

    const newCapacity = Number(req.body.capacity);

    const bookedSeats = Math.max(
      existingSchedule.capacity - existingSchedule.availableSeats,
      0
    );

    if (newCapacity < bookedSeats) {
      return res.status(400).json({
        error: `Capacity cannot be less than already booked seats (${bookedSeats}).`,
      });
    }

    const updatedSchedule = await prisma.trainSchedule.update({
      where: { id },
      data: {
        ...updateScheduleDTO(req.body),
        availableSeats: newCapacity - bookedSeats,
      },
    });

    res.json(updatedSchedule);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update schedule" });
  }
};

export const deleteScheduleData = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const result = await prisma.trainSchedule.deleteMany({
      where: { id },
    });

    if (result.count === 0) {
      return res.status(404).json({
        error: "Schedule not found",
      });
    }

    res.json({
      message: "Schedule deleted successfully",
      id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete schedule" });
  }
};