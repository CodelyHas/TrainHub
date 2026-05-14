import { body, param } from "express-validator";

export const validateCreateStaff = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3, max: 100 })
    .withMessage("Full name must be between 3 and 60 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8, max: 70 })
    .withMessage("Password must be between 8 and 72 characters"),
];

export const validateUserId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("User ID must be a positive integer"),
];

export const validateUpdateStaff = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required")
    .isLength({ min: 3, max: 60 })
    .withMessage("Full name must be between 3 and 60 characters"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address")
    .normalizeEmail(),
];

export const validateStaffStatus = [
  body("isActive")
    .isBoolean()
    .withMessage("isActive must be true or false"),
];