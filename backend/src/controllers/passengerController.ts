import {
  createPassengerDTO,
  formatPassengerResponseDTO,
} from "../dtos/passenger.dto.ts";
import prisma from "../config/prisma.ts";
import type { Request, Response } from "express";

export const getPassengerData = async (_req: Request, res: Response) => {
  try {
    const passengers = await prisma.passenger.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return res.json(passengers.map(formatPassengerResponseDTO));
  } catch (error) {
    console.error("Error fetching passengers:", error);

    return res.status(500).json({
      message: "Failed to fetch passengers",
    });
  }
};

export const createPassenger = async (req: Request, res: Response) => {
  try {
    const passenger = await prisma.passenger.create({
      data: createPassengerDTO(req.body),
    });

    return res.status(201).json({
      message: "Passenger registered successfully",
      passenger: formatPassengerResponseDTO(passenger),
    });
  } catch (error: any) {
    console.error("Error creating passenger:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        message: "A passenger with this National ID already exists",
      });
    }

    return res.status(500).json({
      message: "Failed to register passenger",
    });
  }
};

export const updatePassenger = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    const updatedPassenger = await prisma.passenger.update({
      where: { id },
      data: createPassengerDTO(req.body),
    });

    return res.json(formatPassengerResponseDTO(updatedPassenger));
  } catch (error: any) {
    console.error("Error updating passenger:", error);

    if (error.code === "P2002") {
      return res.status(409).json({
        message: "A passenger with this National ID already exists",
      });
    }

    return res.status(500).json({
      message: "Failed to update passenger",
    });
  }
};

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
      passenger: formatPassengerResponseDTO(updatedPassenger),
    });
  } catch (error) {
    console.error("Error updating passenger status:", error);

    return res.status(500).json({
      message: "Failed to update passenger status",
    });
  }
};