import type { UtilizationReportRow } from "../../features/reports/reportTypes";

interface Props {
  rows: UtilizationReportRow[];
}

function UtilizationReportTable({ rows }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="font-bold text-gray-900">Train Utilization Report</h3>
        <p className="mt-1 text-sm text-gray-500">
          Shows seat usage and occupancy rate for each train schedule.
        </p>
      </div>

      <div className="overflow-auto">
        <table className="w-full min-w-220 border-collapse">
          <thead className="bg-gray-100">
            <tr className="tableHeaders">
              <th>Train</th>
              <th>Route</th>
              <th>Capacity</th>
              <th>Occupied Seats</th>
              <th>Available Seats</th>
              <th>Utilization Rate</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr className="tableCells text-center">
                <td colSpan={6} className="py-6 text-sm text-gray-500">
                  No utilization report generated yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="tableCells text-center odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td>{row.trainName}</td>
                  <td>{row.route}</td>
                  <td>{row.capacity}</td>
                  <td>{row.occupiedSeats}</td>
                  <td>{row.availableSeats}</td>
                  <td>{row.utilizationRate}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UtilizationReportTable;