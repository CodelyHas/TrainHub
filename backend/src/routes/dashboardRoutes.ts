import express from "express";
import { getDashboardSummary } from "../controllers/dashboardController.ts";
import {
  authenticateToken,
  authorizeRoles,
} from "../middleware/authMiddleware.ts";

const router = express.Router();

router.get(
  "/summary",
  authenticateToken,
  authorizeRoles("ADMIN"),
  getDashboardSummary
);

export default router;