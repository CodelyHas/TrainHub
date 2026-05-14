import { z } from "zod";

type ValidationMode = "create" | "edit";

export const getScheduleSchema = (mode: ValidationMode) =>
  z
    .object({
      trainName: z.string().trim().min(1, "Train name is required."),

      departure: z.string().trim().min(1, "Departure city is required."),

      arrival: z.string().trim().min(1, "Arrival city is required."),

      departureTime: z.string().min(1, "Departure time is required."),

      arrivalTime: z.string().min(1, "Arrival time is required."),

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
      const now = new Date();

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