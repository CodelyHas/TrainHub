import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import prisma from "../config/prisma.ts";

const staffSelect = {
  id: true,
  fullName: true,
  email: true,
  role: true,
  isActive: true,
  createdAt: true,
};

const findStaffById = async (id: number) => {
  const staff = await prisma.user.findUnique({
    where: { id },
  });

  if (!staff || staff.role !== "STAFF") {
    return null;
  }

  return staff;
};

const emailExistsForAnotherUser = async (email: string, userId?: number) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) return false;

  if (userId && existingUser.id === userId) return false;

  return true;
};

export const createStaff = async (req: Request, res: Response) => {
  try {
    const { fullName, email, password } = req.body;

    const emailExists = await emailExistsForAnotherUser(email);

    if (emailExists) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const staff = await prisma.user.create({
      data: {
        fullName,
        email,
        passwordHash,
        role: "STAFF",
        isActive: true,
      },
      select: staffSelect,
    });

    return res.status(201).json({
      message: "Staff account created successfully",
      staff,
    });
  } catch (error) {
    console.error("Error creating staff account:", error);

    return res.status(500).json({
      message: "Failed to create staff account",
    });
  }
};

export const getStaffUsers = async (_req: Request, res: Response) => {
  try {
    const staffUsers = await prisma.user.findMany({
      where: {
        role: "STAFF",
      },
      orderBy: {
        createdAt: "desc",
      },
      select: staffSelect,
    });

    return res.status(200).json(staffUsers);
  } catch (error) {
    console.error("Error fetching staff users:", error);

    return res.status(500).json({
      message: "Failed to fetch staff accounts",
    });
  }
};

export const updateStaff = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { fullName, email } = req.body;

    const staff = await findStaffById(id);

    if (!staff) {
      return res.status(404).json({
        message: "Staff account not found",
      });
    }

    const emailExists = await emailExistsForAnotherUser(email, id);

    if (emailExists) {
      return res.status(409).json({
        message: "An account with this email already exists",
      });
    }

    const updatedStaff = await prisma.user.update({
      where: { id },
      data: {
        fullName,
        email,
      },
      select: staffSelect,
    });

    return res.status(200).json({
      message: "Staff account updated successfully",
      staff: updatedStaff,
    });
  } catch (error) {
    console.error("Error updating staff account:", error);

    return res.status(500).json({
      message: "Failed to update staff account",
    });
  }
};

export const updateStaffStatus = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const { isActive } = req.body;

    const staff = await findStaffById(id);

    if (!staff) {
      return res.status(404).json({
        message: "Staff account not found",
      });
    }

    const updatedStaff = await prisma.user.update({
      where: { id },
      data: {
        isActive,
      },
      select: staffSelect,
    });

    return res.status(200).json({
      message: isActive
        ? "Staff account reactivated successfully"
        : "Staff account deactivated successfully",
      staff: updatedStaff,
    });
  } catch (error) {
    console.error("Error updating staff status:", error);

    return res.status(500).json({
      message: "Failed to update staff status",
    });
  }
};