import { z } from "zod";

export const passengerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required.")
    .regex(/^[\p{L}\s]+$/u, "Full name must contain letters and spaces only."),

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
    }),

  ageGroup: z.enum(["ADULT", "CHILD"], {
    message: "Age group is required.",
  }),

  isStudent: z.boolean(),
});

export type PassengerFormData = z.infer<typeof passengerSchema>;