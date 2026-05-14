import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Schedule } from "../../features/schedules/scheduleTypes";
import { deleteScheduleRequest } from "../../features/schedules/scheduleApi";

interface Props {
  schedule: Schedule;
  onClose: () => void;
  onDeleted: (deletedScheduleId: number) => void;
}

function DeleteScheduleModal({ schedule, onClose, onDeleted }: Props) {
  const [isSubmitting, setSubmitting] = useState(false);

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

  const handleDelete = async () => {
    try {
      setSubmitting(true);

      await deleteScheduleRequest(schedule.id);

      onDeleted(schedule.id);
      toast.success("Schedule deleted successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong while deleting the schedule";

      toast.error(errorMessage);
      console.error("Error deleting schedule:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="modalContainer">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <i className="fa-solid fa-triangle-exclamation"></i>
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Delete Schedule
          </h2>
        </div>

        <p className="text-gray-700">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{schedule.trainName}</span>?
        </p>

        <p className="text-sm text-gray-500 mt-2">
          This action cannot be undone.
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
            onClick={handleDelete}
            disabled={isSubmitting}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer disabled:opacity-60"
          >
            {isSubmitting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteScheduleModal;