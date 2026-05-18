import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Reservation } from "../../features/reservations/reservationTypes";
import { cancelReservationRequest } from "../../features/reservations/reservationApi";

interface Props {
  reservation: Reservation;
  onClose: () => void;
  onCancelled: (updatedReservation: Reservation) => void;
}

function CancelReservationModal({
  reservation,
  onClose,
  onCancelled,
}: Props) {
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleCancelReservation = async () => {
    try {
      setSubmitting(true);

      const updatedReservation = await cancelReservationRequest(reservation.id);

      onCancelled(updatedReservation);
      toast.success("Reservation cancelled successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong while cancelling the reservation";

      toast.error(errorMessage);
      console.error("Error cancelling reservation:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modalContainer">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
            <i className="fa-solid fa-circle-exclamation"></i>
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Cancel Reservation
          </h2>
        </div>

        <p className="text-gray-700">
          Are you sure you want to cancel the reservation for{" "}
          <span className="font-semibold">{reservation.passengerName}</span>?
        </p>

        <div className="mt-4 rounded-md bg-gray-50 border border-gray-200 p-3 text-sm text-gray-700">
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
            <span className="font-semibold">Seat Class:</span>{" "}
            {reservation.seatClass}
          </p>

          <p>
            <span className="font-semibold">Reserved Seats:</span>{" "}
            {reservation.seatCount}
          </p>

          <p>
            <span className="font-semibold">Discount:</span>{" "}
            {reservation.discountType === "NONE"
              ? "No discount"
              : `${reservation.discountType} (${
                  reservation.discountRate * 100
                }%)`}
          </p>

          <p>
            <span className="font-semibold">Total Price:</span>{" "}
            {reservation.totalPrice} SAR
          </p>
        </div>

        <p className="text-sm text-gray-500 mt-3">
          The reservation status will become cancelled and the reserved seats
          will become available again.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 cursor-pointer disabled:opacity-60"
          >
            Keep Reservation
          </button>

          <button
            type="button"
            onClick={handleCancelReservation}
            disabled={isSubmitting}
            className="px-4 py-2 rounded bg-orange-600 text-white hover:bg-orange-700 cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? "Cancelling..." : "Cancel Reservation"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CancelReservationModal;