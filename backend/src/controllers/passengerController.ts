import { createPassengerDTO } from "../dtos/passenger.dto";
import prisma from "../config/prisma.ts"
import type { Request, Response } from "express";

export const getPassengerData = async (req: Request, res: Response) => {
    try {
    const passengers = await prisma.passenger.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return res.json(passengers);
  } catch (error) {
    console.error("Error fetching passengers:", error);

    return res.status(500).json({
      message: "Failed to fetch passengers",
    });
  }
}

export const createPassenger = async (req: Request, res: Response) => {
  try {
    const passenger = await prisma.passenger.create({
      data: createPassengerDTO(req.body),
    });

    return res.status(201).json({
      message: "Passenger registered successfully",
      passenger,
    });
  } catch (error) {
    console.error("Error creating passenger:", error);

    return res.status(500).json({
      message: "Failed to register passenger",
    });
  }
}

export const updatePassenger = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const updatedPassenger = await prisma.passenger.update({
      where: { id },
      data: createPassengerDTO(req.body),
    });

    return res.json(updatedPassenger);
  } catch (error) {
    console.error("Error updating passenger:", error);

    return res.status(500).json({
      message: "Failed to update passenger",
    });
  }
}

export const updatePassengerStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { status } = req.body;

    if (status !== "ACTIVE" && status !== "INACTIVE") {
      return res.status(400).json({
        message: "Status must be ACTIVE or INACTIVE",
      });
    }

    const updatedPassenger = await prisma.passenger.update({
      where: { id },
      data: { status },
    });

    return res.json({
      message: "Passenger status updated successfully",
      passenger: updatedPassenger,
    });
  } catch (error) {
    console.error("Error updating passenger status:", error);

    return res.status(500).json({
      message: "Failed to update passenger status",
    });
  }
}