import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { OccupancyByTrain } from "../../features/dashboard/dashboardTypes";

interface Props {
  data: OccupancyByTrain[];
}

function OccupancyChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="mt-4 flex h-64 items-center justify-center rounded-md border border-dashed border-gray-300 text-sm text-gray-400">
        No occupancy data available
      </div>
    );
  }

  return (
    <div className="mt-4 h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="trainName" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="occupancyRate" name="Occupancy %" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default OccupancyChart;