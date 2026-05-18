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
          Shows economy, business, and total seat usage for each train schedule.
        </p>
      </div>

      <div className="overflow-auto">
        <table className="w-full min-w-350 border-collapse">
          <thead className="bg-gray-100">
            <tr className="tableHeaders">
              <th>Train</th>
              <th>Route</th>
              <th>Economy Capacity</th>
              <th>Economy Occupied</th>
              <th>Economy Available</th>
              <th>Business Capacity</th>
              <th>Business Occupied</th>
              <th>Business Available</th>
              <th>Total Capacity</th>
              <th>Total Occupied</th>
              <th>Total Available</th>
              <th>Utilization Rate</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr className="tableCells text-center">
                <td colSpan={12} className="py-6 text-sm text-gray-500">
                  No utilization data found for the selected period.
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
                  <td>{row.economyCapacity}</td>
                  <td>{row.economyOccupiedSeats}</td>
                  <td>{row.economyAvailableSeats}</td>
                  <td>{row.businessCapacity}</td>
                  <td>{row.businessOccupiedSeats}</td>
                  <td>{row.businessAvailableSeats}</td>
                  <td>{row.totalCapacity}</td>
                  <td>{row.totalOccupiedSeats}</td>
                  <td>{row.totalAvailableSeats}</td>
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