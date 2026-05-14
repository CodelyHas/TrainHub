import { z } from "zod";

export const reportSchema = z.object({
  reportType: z.enum(["all", "booking", "revenue", "utilization"]),
  period: z.enum(["daily", "weekly", "monthly"]),
  date: z.string().min(1, "Report date is required"),
});

export type ReportSchemaData = z.infer<typeof reportSchema>;