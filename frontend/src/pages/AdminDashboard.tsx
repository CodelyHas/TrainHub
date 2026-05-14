import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import SummaryCard from "../components/dashboard/SummaryCard";
import OccupancyChart from "../components/dashboard/OccupancyChart";

import type { DashboardSummary } from "../features/dashboard/dashboardTypes";
import { fetchDashboardSummary } from "../features/dashboard/dashboardApi";

function AdminDashboard() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardSummary() {
      try {
        const data = await fetchDashboardSummary();
        setSummary(data);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong while loading dashboard data";

        toast.error(message);
        console.error("Dashboard summary error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadDashboardSummary();
  }, []);

  if (loading) {
    return <p className="p-6">Loading dashboard...</p>;
  }

  if (!summary) {
    return (
      <div className="p-6">
        <p className="text-red-600 font-medium">
          Failed to load dashboard data.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Admin Dashboard</h2>

        <p className="mt-1 text-sm text-gray-500">
          Overview of train schedules, passengers, reservations, revenue, and
          occupancy.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          title="Total Schedules"
          value={summary.totalSchedules}
          icon="fa-solid fa-train"
          note="Registered train schedules"
        />

        <SummaryCard
          title="Total Passengers"
          value={summary.totalPassengers}
          icon="fa-solid fa-users"
          note="Registered passengers"
        />

        <SummaryCard
          title="Total Bookings"
          value={summary.totalBookings}
          icon="fa-solid fa-ticket"
          note="Confirmed reservations"
        />

        <SummaryCard
          title="Revenue"
          value={`${summary.totalRevenue} SAR`}
          icon="fa-solid fa-coins"
          note="Confirmed booking revenue"
        />
      </div>

      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <div>
          <h3 className="font-bold text-gray-900">Seat Occupancy Rate</h3>

          <p className="mt-1 text-sm text-gray-500">
            Occupancy percentage for each train schedule based on reserved
            seats.
          </p>
        </div>

        <OccupancyChart data={summary.occupancyByTrain} />
      </div>

      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
        <h3 className="font-bold text-gray-900">Occupancy Details</h3>

        <div className="mt-4 overflow-auto">
          <table className="w-full min-w-220 border-collapse">
            <thead className="bg-gray-200">
              <tr className="tableHeaders">
                <th>Train</th>
                <th>Route</th>
                <th>Capacity</th>
                <th>Occupied Seats</th>
                <th>Available Seats</th>
                <th>Occupancy Rate</th>
              </tr>
            </thead>

            <tbody>
              {summary.occupancyByTrain.map((train) => (
                <tr
                  key={train.id}
                  className="tableCells text-center odd:bg-white even:bg-gray-50"
                >
                  <td>{train.trainName}</td>
                  <td>{train.route}</td>
                  <td>{train.capacity}</td>
                  <td>{train.occupiedSeats}</td>
                  <td>{train.availableSeats}</td>
                  <td>{train.occupancyRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>

          {summary.occupancyByTrain.length === 0 && (
            <p className="py-6 text-center text-sm text-gray-500">
              No train schedules available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;