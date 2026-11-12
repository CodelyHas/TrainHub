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
    .isLength({ min: 2, max: 15 })
    .withMessage("Passenger full name must be between 2 and 15 characters")
    .matches(/^[\p{L}\s]+$/u)
    .withMessage("Passenger full name must contain letters and spaces only"),

  body("nationalId")
    .trim()
    .notEmpty()
    .withMessage("National ID is required")
    .isLength({ min: 5, max: 20 })
    .withMessage("National ID must be between 5 and 20 characters")
    .isNumeric()
    .withMessage("National ID must contain numbers only"),

  body("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone number is required")
    .isLength({ min: 7, max: 10 })
    .withMessage("Phone number must be between 7 and 10 digits")
    .isNumeric()
    .withMessage("Phone number must contain numbers only"),

  body("email")
    .optional({ values: "falsy" })
    .trim()
    .isEmail()
    .withMessage("Email must be valid"),

  body("ageGroup")
    .optional()
    .isIn(["ADULT", "CHILD"])
    .withMessage("Age group must be Adult or Child"),

  body("isStudent")
    .optional()
    .isBoolean()
    .withMessage("Student status must be true or false")
    .toBoolean(),
];