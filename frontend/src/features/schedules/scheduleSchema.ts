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

      economyPrice: z
        .string()
        .trim()
        .min(1, "Economy price is required.")
        .refine((value) => Number(value) >= 1, {
          message: "Economy price must be at least 1.",
        }),

      businessPrice: z
        .string()
        .trim()
        .min(1, "Business price is required.")
        .refine((value) => Number(value) >= 1, {
          message: "Business price must be at least 1.",
        }),

      economyCapacity: z
        .string()
        .trim()
        .min(1, "Economy capacity is required.")
        .refine((value) => Number(value) >= 1, {
          message: "Economy capacity must be at least 1.",
        }),

      businessCapacity: z
        .string()
        .trim()
        .min(1, "Business capacity is required.")
        .refine((value) => Number(value) >= 1, {
          message: "Business capacity must be at least 1.",
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

      const economyCapacity = Number(data.economyCapacity);
      const businessCapacity = Number(data.businessCapacity);

      if (
        data.economyCapacity &&
        data.businessCapacity &&
        businessCapacity > economyCapacity
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["businessCapacity"],
          message: "Business capacity cannot be greater than economy capacity.",
        });
      }

      const economyPrice = Number(data.economyPrice);
      const businessPrice = Number(data.businessPrice);

      if (
        data.economyPrice &&
        data.businessPrice &&
        businessPrice <= economyPrice
      ) {
        ctx.addIssue({
          code: "custom",
          path: ["businessPrice"],
          message: "Business price must be greater than economy price.",
        });
      }

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