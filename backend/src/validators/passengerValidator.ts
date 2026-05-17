import { body, param } from "express-validator";

export const validatePassengerId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Passenger ID must be a positive integer"),
];

export const validatePassenger = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Passenger full name is required")
    .matches(/^[\p{L}\s]+$/u)
    .withMessage("Passenger full name must contain letters and spaces only"),

  body("nationalId")
    .trim()
    .notEmpty()
    .withMessage("National ID is required")
    .isLength({ min: 5, max: 20 })
    .withMessage("National ID must be between 5 and 20 characters"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 7, max: 15 })
    .withMessage("Phone number must be between 7 and 15 digits"),

  body("email")
    .optional({ values: "falsy" })
    .trim()
    .isEmail()
    .withMessage("Email must be valid"),
];