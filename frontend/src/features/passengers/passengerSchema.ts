import { z } from "zod";

export const passengerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required."),

  nationalId: z
    .string()
    .trim()
    .min(1, "National ID is required.")
    .regex(/^\d+$/, "National ID must contain numbers only.")
    .min(5, "National ID must be between 5 and 20 characters.")
    .max(20, "National ID must be between 5 and 20 characters."),

  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required.")
    .regex(/^\d+$/, "Phone number must contain numbers only.")
    .min(7, "Phone number must be between 7 and 15 digits.")
    .max(15, "Phone number must be between 7 and 15 digits."),

email: z
  .string()
  .trim()
  .refine((value) => value === "" || z.email().safeParse(value).success, {
    message: "Email must be valid.",
  })
});

export type PassengerFormData = z.infer<typeof passengerSchema>;