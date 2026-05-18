import { body, param } from "express-validator";

export const validateReservationId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Reservation ID must be a positive integer"),
];

export const validateReservation = [
  body("nationalId")
    .trim()
    .notEmpty()
    .withMessage("Passenger National ID is required")
    .isLength({ min: 5, max: 20 })
    .withMessage("National ID must be between 5 and 20 characters")
    .isNumeric()
    .withMessage("National ID must contain numbers only"),

  body("scheduleId")
    .isInt({ min: 1 })
    .withMessage("Train schedule is required"),

  body("seatClass")
    .isIn(["ECONOMY", "BUSINESS"])
    .withMessage("Seat class must be Economy or Business"),

  body("seatCount")
    .isInt({ min: 1 })
    .withMessage("Seat count must be at least 1")
    .toInt(),
];