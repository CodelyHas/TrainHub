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
      .withMessage("Departure city is required")
      .matches(/^[\p{L}\s.'-]+$/u)
      .withMessage("Departure city must contain letters only"),

    body("arrival")
      .trim()
      .notEmpty()
      .withMessage("Arrival city is required")
      .matches(/^[\p{L}\s.'-]+$/u)
      .withMessage("Arrival city must contain letters only")
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

        const maxScheduleDate = new Date();
        maxScheduleDate.setFullYear(maxScheduleDate.getFullYear() + 1);

        if (mode === "create" && departureDate < now) {
          throw new Error("Departure time cannot be in the past");
        }

        if (departureDate > maxScheduleDate) {
          throw new Error(
            "Departure time cannot be more than 1 year in the future"
          );
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

        const maxScheduleDate = new Date();
        maxScheduleDate.setFullYear(maxScheduleDate.getFullYear() + 1);

        if (mode === "create" && arrivalDate < now) {
          throw new Error("Arrival time cannot be in the past");
        }

        if (arrivalDate > maxScheduleDate) {
          throw new Error(
            "Arrival time cannot be more than 1 year in the future"
          );
        }

        if (departureTimeValue && arrivalDate <= departureTime) {
          throw new Error("Arrival time must be after departure time");
        }

        return true;
      }),

    body("economyPrice")
      .isFloat({ min: 1 })
      .withMessage("Economy price must be at least 1")
      .toFloat(),

    body("businessPrice")
      .isFloat({ min: 1 })
      .withMessage("Business price must be at least 1")
      .toFloat()
      .custom((businessPrice, { req }) => {
        const economyPrice = Number(req.body.economyPrice);

        if (Number(businessPrice) <= economyPrice) {
          throw new Error("Business price must be greater than economy price");
        }

        return true;
      }),

    body("economyCapacity")
      .isInt({ min: 1 })
      .withMessage("Economy capacity must be at least 1")
      .toInt(),

    body("businessCapacity")
      .isInt({ min: 1 })
      .withMessage("Business capacity must be at least 1")
      .toInt()
      .custom((businessCapacity, { req }) => {
        const economyCapacity = Number(req.body.economyCapacity);

        if (Number(businessCapacity) > economyCapacity) {
          throw new Error(
            "Business capacity cannot be greater than economy capacity"
          );
        }

        return true;
      }),
  ];
};