import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import type { Staff } from "../../features/staff/staffTypes";
import { updateStaffAccountStatus } from "../../features/staff/staffApi";

interface Props {
  staff: Staff;
  action: "deactivate" | "reactivate";
  onClose: () => void;
  onStatusChanged: (updatedStaff: Staff) => void;
}

function StaffStatusModal({ staff, action, onClose, onStatusChanged }: Props) {
  const [isSubmitting, setSubmitting] = useState(false);
  const isDeactivating = action === "deactivate";

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleStatusChange = async () => {
    try {
      const updatedStaff = await updateStaffAccountStatus(
        staff.id,
        !isDeactivating
      );

      onStatusChanged(updatedStaff);

      toast.success(
        isDeactivating
          ? "Staff account deactivated successfully"
          : "Staff account reactivated successfully"
      );
    } catch (error) {
      toast.error("Something went wrong while updating staff status");
      console.error("Error updating staff status:", error);
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
            {isDeactivating ? "Deactivate Staff" : "Reactivate Staff"}
          </h2>
        </div>

        <p className="text-gray-700">
          Are you sure you want to{" "}
          {isDeactivating ? "deactivate" : "reactivate"}{" "}
          <span className="font-semibold">{staff.fullName}</span>?
        </p>

        <p className="text-sm text-gray-500 mt-2">
          {isDeactivating
            ? "This staff member will no longer be able to log in to the system."
            : "This staff member will be able to log in again."}
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

export default StaffStatusModal;