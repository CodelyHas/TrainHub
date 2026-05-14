import express from "express";
import { validateSchedule} from "../validators/scheduleValidator.ts";
import { validationMiddleware } from "../middleware/validationMiddleware.ts";
import {
  authenticateToken,
  authorizeRoles,
} from "../middleware/authMiddleware.ts";
import {
  createStaff,
  getStaffUsers,
  updateStaff,
  updateStaffStatus,
} from "../controllers/userController.ts";

import {
  validateCreateStaff,
  validateUpdateStaff,
  validateStaffStatus,
  validateUserId,
} from "../validators/userValidator.ts";

const router = express.Router();

router.get(
  "/staff",
  authenticateToken,
  authorizeRoles("ADMIN"),
  getStaffUsers
);

router.post(
  "/staff",
  authenticateToken,
  authorizeRoles("ADMIN"),
  validateCreateStaff,
  validationMiddleware,
  createStaff
);

router.put(
  "/staff/:id",
  authenticateToken,
  authorizeRoles("ADMIN"),
  validateUserId,
  validateUpdateStaff,
  validationMiddleware,
  updateStaff
);

router.patch(
  "/staff/:id/status",
  authenticateToken,
  authorizeRoles("ADMIN"),
  validateUserId,
  validateStaffStatus,
  validationMiddleware,
  updateStaffStatus
);

export default router;