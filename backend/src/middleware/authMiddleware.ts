import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface AuthPayload {
  id: number;
  email: string;
  role: "ADMIN" | "STAFF";
}

export interface AuthRequest extends Request {
  user?: AuthPayload;
}

export const authenticateToken =(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Access denied. Invalid token format.",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as AuthPayload;

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Session expired. Please log in again.",
    });
  }
}

export const authorizeRoles = (...allowedRoles: AuthPayload["role"][]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({
        message: "Access denied. User not authenticated.",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access denied. You do not have permission to perform this action.",
      });
    }

    next();
  };
}