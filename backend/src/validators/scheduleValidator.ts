import { body, param } from "express-validator";

type ScheduleValidationMode = "create" | "update";

export const validateScheduleId = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Schedule ID must be a positive integer"),
];

export const validateSchedule = (mode: ScheduleValidationMode) => {
 return [
    body("trainName")
      .trim()
      .notEmpty()
      .withMessage("Train name is required"),

    body("departure")
      .trim()
      .notEmpty()
      .withMessage("Departure city is required"),

    body("arrival")
      .trim()
      .notEmpty()
      .withMessage("Arrival city is required")
      .custom((arrival, { req }) => {
        if (
          String(arrival).trim().toLowerCase() ===
          String(req.body.departure).trim().toLowerCase()
        ) {
          throw new Error("Arrival city cannot be the same as departure city");
        }

        return true;
      }),

    body("departureTime")
      .isISO8601()
      .withMessage("Departure time must be a valid date")
      .custom((departureTime) => {
        const departureDate = new Date(departureTime);
        const now = new Date();

        if (mode === "create" && departureDate < now) {
          throw new Error("Departure time cannot be in the past");
        }

        return true;
      }),

    body("arrivalTime")
      .isISO8601()
      .withMessage("Arrival time must be a valid date")
      .custom((arrivalTime, { req }) => {
        const departureTimeValue = req.body.departureTime;

        const departureTime = new Date(departureTimeValue);
        const arrivalDate = new Date(arrivalTime);
        const now = new Date();

        if (mode === "create" && arrivalDate < now) {
          throw new Error("Arrival time cannot be in the past");
        }

        if (departureTimeValue && arrivalDate <= departureTime) {
          throw new Error("Arrival time must be after departure time");
        }

        return true;
      }),

    body("price")
      .isFloat({ min: 1 })
      .withMessage("Price must be positive")
      .toFloat(),

    body("capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1")
      .toInt(),
  ];
}