import { body } from "express-validator";

export const validateReport = [
  body("reportType")
    .optional()
    .isIn(["all", "booking", "revenue", "utilization"])
    .withMessage("Report type must be all, booking, revenue, or utilization"),

  body("period")
    .trim()
    .notEmpty()
    .withMessage("Report period is required")
    .isIn(["daily", "weekly", "monthly"])
    .withMessage("Report period must be daily, weekly, or monthly"),

  body("date")
    .trim()
    .notEmpty()
    .withMessage("Report date is required")
    .isISO8601()
    .withMessage("Report date must be a valid date"),
];