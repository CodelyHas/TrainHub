import express from "express";
import { generateReport } from "../controllers/reportController.ts";
import { validateReport } from "../validators/reportValidator.ts";
import { validationMiddleware } from "../middleware/validationMiddleware.ts";
import {
  authenticateToken,
  authorizeRoles,
} from "../middleware/authMiddleware.ts";

const router = express.Router();

router.post(
  "/generate",
  authenticateToken,
  authorizeRoles("ADMIN"),
  validateReport,
  validationMiddleware,
  generateReport
);

export default router;