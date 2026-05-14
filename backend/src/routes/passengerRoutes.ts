import express from "express";
import {
  createPassenger,
  getPassengerData,
  updatePassenger,
  updatePassengerStatus,
} from "../controllers/passengerController.ts";
import {
  validatePassenger,
  validatePassengerId,
} from "../validators/passengerValidator.ts";
import { validationMiddleware } from "../middleware/validationMiddleware.ts";
import { authenticateToken } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  validatePassenger,
  validationMiddleware,
  createPassenger
);

router.get(
  "/",
  authenticateToken,
  getPassengerData
);

router.put(
  "/:id",
  authenticateToken,
  validatePassengerId,
  validatePassenger,
  validationMiddleware,
  updatePassenger
);

router.patch(
  "/:id/status",
  authenticateToken,
  validatePassengerId,
  validationMiddleware,
  updatePassengerStatus
);

export default router;