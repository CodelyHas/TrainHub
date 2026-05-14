import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import prisma from "../config/prisma.ts";
import { createLoginDTO } from "../dtos/auth.dto.ts";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const loginData = createLoginDTO(req.body);

    const user = await prisma.user.findUnique({
      where: {
        email: loginData.email,
      },
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: "This account has been deactivated. Contact the system administrator.",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      loginData.password,
      user.passwordHash
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: "8h",
      }
    );
    
    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
    
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Failed to login",
    });
  }
};