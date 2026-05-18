import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import type { Reservation } from "../../features/reservations/reservationTypes";

interface Props {
  reservation: Reservation;
  onClose: () => void;
}

function BookingConfirmationModal({ reservation, onClose }: Props) {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: receiptRef,
    documentTitle: `Reservation-${reservation.id}-Receipt`,
  });

  return (
    <div className="modalContainer">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <div ref={receiptRef} className="bg-white p-2">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Booking Confirmation
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                Reservation #{reservation.id}
              </p>
            </div>

            <div
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                reservation.status === "CONFIRMED"
                  ? "bg-green-100 text-green-700"
                  : reservation.status === "CANCELLED"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-gray-200 text-gray-600"
              }`}
            >
              {reservation.status}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="font-bold text-gray-800 mb-3">
                Passenger Details
              </h3>

              <p className="text-sm text-gray-700">
                <span className="font-semibold">Name:</span>{" "}
                {reservation.passengerName}
              </p>

              {reservation.nationalId && (
                <p className="text-sm text-gray-700 mt-2">
                  <span className="font-semibold">National ID:</span>{" "}
                  {reservation.nationalId}
                </p>
              )}

              {reservation.ageGroup && (
                <p className="text-sm text-gray-700 mt-2">
                  <span className="font-semibold">Age Group:</span>{" "}
                  {reservation.ageGroup}
                </p>
              )}

              <p className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">Student:</span>{" "}
                {reservation.isStudent ? "Yes" : "No"}
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <h3 className="font-bold text-gray-800 mb-3">Ticket Details</h3>

              <p className="text-sm text-gray-700">
                <span className="font-semibold">Seat Class:</span>{" "}
                {reservation.seatClass}
              </p>

              <p className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">Reserved Seats:</span>{" "}
                {reservation.seatCount}
              </p>

              <p className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">Original Price:</span>{" "}
                {reservation.originalPrice} SAR
              </p>

              <p className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">Discount:</span>{" "}
                {reservation.discountType === "NONE"
                  ? "No discount"
                  : `${reservation.discountType} (${
                      reservation.discountRate * 100
                    }%)`}
              </p>

              <p className="text-sm text-gray-700 mt-2">
                <span className="font-semibold">Final Total:</span>{" "}
                {reservation.totalPrice} SAR
              </p>
            </div>
          </div>

          <div className="rounded-lg border border-gray-200 p-4 mt-4">
            <h3 className="font-bold text-gray-800 mb-3">Trip Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Train:</span>{" "}
                {reservation.trainName}
              </p>

              <p>
                <span className="font-semibold">Route:</span>{" "}
                {reservation.departure} → {reservation.arrival}
              </p>

              <p>
                <span className="font-semibold">Departure:</span>{" "}
                {new Date(reservation.departureTime).toLocaleString()}
              </p>

              <p>
                <span className="font-semibold">Arrival:</span>{" "}
                {new Date(reservation.arrivalTime).toLocaleString()}
              </p>
            </div>
          </div>

          {reservation.createdAt && (
            <p className="text-xs text-gray-500 mt-4">
              Booking created at:{" "}
              {new Date(reservation.createdAt).toLocaleString()}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-3 mt-6 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="px-4 py-2 rounded bg-gray-100 text-gray-800 hover:bg-gray-200 cursor-pointer"
          >
            Print
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingConfirmationModal;