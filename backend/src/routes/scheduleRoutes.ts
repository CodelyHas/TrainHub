import express from "express";
import {
  sendScheduleData,
  getScheduleData,
  updateScheduleData,
  deleteScheduleData,
} from "../controllers/scheduleController.ts";
import { validateSchedule, validateScheduleId } from "../validators/scheduleValidator.ts";
import { validationMiddleware } from "../middleware/validationMiddleware.ts";
import {
  authenticateToken,
  authorizeRoles,
} from "../middleware/authMiddleware.ts";

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  authorizeRoles("ADMIN"),
  validateSchedule("create"),
  validationMiddleware,
  sendScheduleData
);

router.get("/", authenticateToken, getScheduleData);

router.put(
  "/:id",
  authenticateToken,
  authorizeRoles("ADMIN"),
  validateScheduleId,
  validateSchedule("update"),
  validationMiddleware,
  updateScheduleData
);

router.delete(
  "/:id",
  authenticateToken,
  authorizeRoles("ADMIN"),
  validateScheduleId,
  validationMiddleware,
  deleteScheduleData
);

export default router;