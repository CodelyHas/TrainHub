import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  reportSchema,
  type ReportSchemaData,
} from "../../features/reports/reportSchema";

interface Props {
  loading: boolean;
  onGenerate: (data: ReportSchemaData) => void;
}

function ReportFilter({ loading, onGenerate }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReportSchemaData>({
    resolver: zodResolver(reportSchema),
    defaultValues: {
      reportType: "all",
      period: "daily",
      date: "",
    },
  });

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <form
        onSubmit={handleSubmit(onGenerate)}
        className="grid grid-cols-1 gap-4 md:grid-cols-4"
        noValidate
        autoComplete="off"
      >
        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-600">
            Report Type
          </label>

          <select
            {...register("reportType")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="all">All Reports</option>
            <option value="booking">Booking Activity Report</option>
            <option value="revenue">Revenue Analysis Report</option>
            <option value="utilization">Train Utilization Report</option>
          </select>

          {errors.reportType && (
            <p className="mt-1 text-xs font-semibold text-red-600">
              {errors.reportType.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-600">
            Report Period
          </label>

          <select
            {...register("period")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>

          {errors.period && (
            <p className="mt-1 text-xs font-semibold text-red-600">
              {errors.period.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-gray-600">
            Report Date
          </label>

          <input
            type="date"
            {...register("date")}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none focus:border-blue-500"
          />

          {errors.date && (
            <p className="mt-1 text-xs font-semibold text-red-600">
              {errors.date.message}
            </p>
          )}
        </div>

        <div className="flex items-start pt-6">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Generating..." : "Generate Report"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default ReportFilter;