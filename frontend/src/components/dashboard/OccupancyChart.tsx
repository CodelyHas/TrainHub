import { useEffect, useState } from "react";
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setMounted(true);
    });

    return () => cancelAnimationFrame(timer);
  }, []);

  if (data.length === 0) {
    return (
      <div className="mt-4 flex h-64 w-full items-center justify-center rounded-md border border-dashed border-gray-300 text-sm text-gray-400">
        No occupancy data available
      </div>
    );
  }

  if (!mounted) {
    return <div className="mt-4 h-72 w-full" />;
  }

  return (
    <div className="mt-4 h-72 w-full min-w-0">
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