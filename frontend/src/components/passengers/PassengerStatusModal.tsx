import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Passenger } from "../../features/passengers/passengerTypes";
import { updatePassengerStatusRequest } from "../../features/passengers/passengerApi";

interface Props {
  passenger: Passenger;
  action: "deactivate" | "reactivate";
  onClose: () => void;
  onStatusChanged: (updatedPassenger: Passenger) => void;
}

function PassengerStatusModal({
  passenger,
  action,
  onClose,
  onStatusChanged,
}: Props) {
  const [isSubmitting, setSubmitting] = useState(false);

  const isDeactivating = action === "deactivate";

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleStatusChange = async () => {
    try {
      setSubmitting(true);

      const updatedPassenger = await updatePassengerStatusRequest(
        passenger.id,
        isDeactivating ? "INACTIVE" : "ACTIVE"
      );

      onStatusChanged(updatedPassenger);

      toast.success(
        isDeactivating
          ? "Passenger deactivated successfully"
          : "Passenger reactivated successfully"
      );
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong while updating passenger status";

      toast.error(errorMessage);
      console.error("Error updating passenger status:", error);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className="modalContainer">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`h-10 w-10 rounded-full flex items-center justify-center ${
              isDeactivating
                ? "bg-orange-100 text-orange-600"
                : "bg-green-100 text-green-600"
            }`}
          >
            <i
              className={
                isDeactivating
                  ? "fa-solid fa-user-slash"
                  : "fa-solid fa-user-check"
              }
            ></i>
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            {isDeactivating ? "Deactivate Passenger" : "Reactivate Passenger"}
          </h2>
        </div>

        <p className="text-gray-700">
          Are you sure you want to{" "}
          {isDeactivating ? "deactivate" : "reactivate"}{" "}
          <span className="font-semibold">{passenger.fullName}</span>?
        </p>

        <p className="text-sm text-gray-500 mt-2">
          {isDeactivating
            ? "This passenger will no longer be available for new reservations, but their booking history will remain stored."
            : "This passenger will become available for new reservations again."}
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 cursor-pointer disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleStatusChange}
            disabled={isSubmitting}
            className={`px-4 py-2 rounded text-white cursor-pointer disabled:opacity-60 ${
              isDeactivating
                ? "bg-orange-600 hover:bg-orange-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {isSubmitting
              ? isDeactivating
                ? "Deactivating..."
                : "Reactivating..."
              : isDeactivating
              ? "Deactivate"
              : "Reactivate"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PassengerStatusModal;