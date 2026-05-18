import type { Reservation } from "../../features/reservations/reservationTypes";

interface Props {
  reservations: Reservation[];
  onViewReceipt: (reservation: Reservation) => void;
  onCancel: (reservation: Reservation) => void;
}

function ReservationTable({ reservations, onViewReceipt, onCancel }: Props) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm">
      <div className="max-h-125 overflow-auto">
        <table className="min-w-325 w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0 z-10 shadow-sm">
            <tr className="tableHeaders">
              <th>Passenger</th>
              <th>Train</th>
              <th>From</th>
              <th>To</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Class</th>
              <th>Seats</th>
              <th>Discount</th>
              <th>Total</th>
              <th>Status</th>
              <th className="min-w-28">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reservations.map((reservation) => (
              <tr
                key={reservation.id}
                className="tableCells text-center odd:bg-white even:bg-gray-50 hover:bg-gray-100"
              >
                <td>{reservation.passengerName}</td>
                <td>{reservation.trainName}</td>
                <td>{reservation.departure}</td>
                <td>{reservation.arrival}</td>
                <td>{new Date(reservation.departureTime).toLocaleString()}</td>
                <td>{new Date(reservation.arrivalTime).toLocaleString()}</td>
                <td>{reservation.seatClass}</td>
                <td>{reservation.seatCount}</td>
                <td>
                  {reservation.discountType === "NONE"
                    ? "—"
                    : `${reservation.discountType} (${
                        reservation.discountRate * 100
                      }%)`}
                </td>
                <td>{reservation.totalPrice} SAR</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      reservation.status === "CONFIRMED"
                        ? "bg-green-100 text-green-700"
                        : reservation.status === "CANCELLED"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {reservation.status}
                  </span>
                </td>

                <td>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => onViewReceipt(reservation)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-blue-600 hover:bg-blue-50 hover:text-blue-800 cursor-pointer transition"
                      aria-label={`View receipt for ${reservation.passengerName}`}
                      title="View receipt"
                    >
                      <i className="fa-solid fa-receipt"></i>
                    </button>

                    <button
                      type="button"
                      onClick={() => onCancel(reservation)}
                      disabled={reservation.status !== "CONFIRMED"}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-orange-600 hover:bg-orange-50 hover:text-orange-800 cursor-pointer transition disabled:opacity-40 disabled:cursor-not-allowed"
                      aria-label={`Cancel reservation for ${reservation.passengerName}`}
                      title="Cancel reservation"
                    >
                      <i className="fa-solid fa-ban"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReservationTable;