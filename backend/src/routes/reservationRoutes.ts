import express from "express";
import {
  createReservation,
  getReservations,
  cancelReservation,
} from "../controllers/reservationController.ts";
import {
  validateReservation,
  validateReservationId,
} from "../validators/reservationValidator.ts";
import { validationMiddleware } from "../middleware/validationMiddleware.ts";
import { authenticateToken } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  validateReservation,
  validationMiddleware,
  createReservation
);

router.get(
  "/",
  authenticateToken,
  getReservations
);

router.patch(
  "/:id/cancel",
  authenticateToken,
  validateReservationId,
  validationMiddleware,
  cancelReservation
);

export default router;