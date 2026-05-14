import { z } from "zod";

export const staffBaseSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(1, "Full name is required")
    .min(3, "Full name must be at least 3 characters")
    .max(60, "Full name must be at most 60 characters"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

export const createStaffSchema = staffBaseSchema
  .extend({
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must be at least 8 characters")
      .max(72, "Password must be at most 72 characters"),

    confirmPassword: z
      .string()
      .min(1, "Confirm password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const editStaffSchema = staffBaseSchema;

export type CreateStaffFormData = z.infer<typeof createStaffSchema>;
export type EditStaffFormData = z.infer<typeof editStaffSchema>;
export type StaffFormData = CreateStaffFormData | EditStaffFormData;