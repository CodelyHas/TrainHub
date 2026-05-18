import type { BookingReportRow } from "../../features/reports/reportTypes";

interface Props {
  rows: BookingReportRow[];
}

function BookingReportTable({ rows }: Props) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="font-bold text-gray-900">Booking Activity Report</h3>
        <p className="mt-1 text-sm text-gray-500">
          Shows reservation activity during the selected period.
        </p>
      </div>

      <div className="overflow-auto">
        <table className="w-full min-w-325 border-collapse">
          <thead className="bg-gray-100">
            <tr className="tableHeaders">
              <th>ID</th>
              <th>Passenger</th>
              <th>Train</th>
              <th>Route</th>
              <th>Class</th>
              <th>Seats</th>
              <th>Original Price</th>
              <th>Discount</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Booking Date</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 ? (
              <tr className="tableCells text-center">
                <td colSpan={11} className="py-6 text-sm text-gray-500">
                  No booking report generated yet.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr
                  key={row.id}
                  className="tableCells text-center odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td>{row.id}</td>
                  <td>{row.passengerName}</td>
                  <td>{row.trainName}</td>
                  <td>{row.route}</td>
                  <td>{row.seatClass}</td>
                  <td>{row.seatCount}</td>
                  <td>{row.originalPrice} SAR</td>
                  <td>
                    {row.discountType === "NONE"
                      ? "—"
                      : `${row.discountType} (${row.discountRate * 100}%)`}
                  </td>
                  <td>{row.totalPrice} SAR</td>
                  <td>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-bold ${
                        row.status === "CONFIRMED"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                  <td>{new Date(row.bookingDate).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BookingReportTable;