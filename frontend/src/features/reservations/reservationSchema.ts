import { z } from "zod";

export const reservationSchema = z.object({
  nationalId: z
    .string()
    .trim()
    .min(1, "Passenger National ID is required.")
    .regex(/^\d+$/, "National ID must contain numbers only.")
    .min(5, "National ID must be between 5 and 20 characters.")
    .max(20, "National ID must be between 5 and 20 characters."),

  scheduleId: z
    .string()
    .trim()
    .min(1, "Train schedule is required.")
    .regex(/^\d+$/, "Invalid train schedule.")
    .refine((value) => Number(value) > 0, {
      message: "Train schedule is required.",
    }),

  seatClass: z.enum(["ECONOMY", "BUSINESS"], {
    message: "Seat class is required.",
  }),

  seatCount: z
    .string()
    .trim()
    .min(1, "Seat count is required.")
    .regex(/^\d+$/, "Seat count must contain numbers only.")
    .refine((value) => Number(value) >= 1, {
      message: "Seat count must be at least 1.",
    }),
});

export type ReservationFormData = z.infer<typeof reservationSchema>;