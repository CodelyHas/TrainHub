import { z } from "zod";

type ValidationMode = "create" | "edit";

const cityNameRegex = /^[\p{L}\s.'-]+$/u;

const isValidDate = (value: string) => {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
};

export const getScheduleSchema = (mode: ValidationMode) =>
  z
    .object({
      trainName: z.string().trim().min(1, "Train name is required."),

      departure: z
        .string()
        .trim()
        .min(1, "Departure city is required.")
        .regex(cityNameRegex, "Departure city must contain letters only."),

      arrival: z
        .string()
        .trim()
        .min(1, "Arrival city is required.")
        .regex(cityNameRegex, "Arrival city must contain letters only."),

      departureTime: z
        .string()
        .min(1, "Departure time is required.")
        .refine(isValidDate, "Departure time must be a valid date."),

      arrivalTime: z
        .string()
        .min(1, "Arrival time is required.")
        .refine(isValidDate, "Arrival time must be a valid date."),

      price: z
        .string()
        .trim()
        .min(1, "Ticket price is required.")
        .refine((value) => Number(value) >= 1, {
          message: "Ticket price must be at least 1.",
        }),

      capacity: z
        .string()
        .trim()
        .min(1, "Train capacity is required.")
        .refine((value) => Number(value) >= 1, {
          message: "Train capacity must be at least 1.",
        }),
    })
    .superRefine((data, ctx) => {
      const departure = data.departure.trim().toLowerCase();
      const arrival = data.arrival.trim().toLowerCase();

      const departureTime = new Date(data.departureTime);
      const arrivalTime = new Date(data.arrivalTime);

      if (
        Number.isNaN(departureTime.getTime()) ||
        Number.isNaN(arrivalTime.getTime())
      ) {
        return;
      }

      const now = new Date();

      const maxScheduleDate = new Date();
      maxScheduleDate.setFullYear(maxScheduleDate.getFullYear() + 1);

      if (departure && arrival && departure === arrival) {
        ctx.addIssue({
          code: "custom",
          path: ["arrival"],
          message: "Arrival city cannot be the same as departure city.",
        });
      }

      if (mode === "create" && data.departureTime && departureTime < now) {
        ctx.addIssue({
          code: "custom",
          path: ["departureTime"],
          message: "Departure time cannot be in the past.",
        });
      }

      if (data.departureTime && departureTime > maxScheduleDate) {
        ctx.addIssue({
          code: "custom",
          path: ["departureTime"],
          message: "Departure time cannot be more than 1 year in the future.",
        });
      }

      if (data.arrivalTime && arrivalTime > maxScheduleDate) {
        ctx.addIssue({
          code: "custom",
          path: ["arrivalTime"],
          message: "Arrival time cannot be more than 1 year in the future.",
        });
      }

      if (mode === "create" && data.arrivalTime && arrivalTime < now) {
        ctx.addIssue({
          code: "custom",
          path: ["arrivalTime"],
          message: "Arrival time cannot be in the past.",
        });
      }

      if (
        data.departureTime &&
        data.arrivalTime &&
        arrivalTime <= departureTime
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["arrivalTime"],
          message: "Arrival time must be after departure time.",
        });
      }
    });

export type ScheduleFormData = z.infer<ReturnType<typeof getScheduleSchema>>;