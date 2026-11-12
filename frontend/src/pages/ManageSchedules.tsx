import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import EditScheduleModal from "../components/schedules/EditScheduleModal";
import DeleteScheduleModal from "../components/schedules/DeleteScheduleModal";
import ScheduleTable from "../components/schedules/ScheduleTable";
import ScheduleEmptyState from "../components/schedules/ScheduleEmptyState";

import type { Schedule } from "../features/schedules/scheduleTypes";
import { fetchSchedules, reconcileSchedulesRequest } from "../features/schedules/scheduleApi";
import { isAdmin } from "../features/auth/authStorage";

import { useEditModal } from "../hooks/useEditModal";
import { useDeleteModal } from "../hooks/useDeleteModal";
import { updateItemById, removeItemById } from "../utils/listUtils";

function ManageSchedules() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [reconciling, setReconciling] = useState(false);

  const admin = isAdmin();

  const {
    selectedItem: selectedSchedule,
    isEditing,
    openEditModal,
    closeEditModal,
  } = useEditModal<Schedule>();

  const {
    selectedItem: scheduleToDelete,
    isDeleting,
    openDeleteModal,
    closeDeleteModal,
  } = useDeleteModal<Schedule>();

  const updateSchedule = (updatedSchedule: Schedule) => {
    setSchedules((prev) => updateItemById(prev, updatedSchedule));
    closeEditModal();
  };

  const removeDeletedSchedule = (deletedScheduleId: number) => {
    setSchedules((prev) => removeItemById(prev, deletedScheduleId));
    closeDeleteModal();
  };

  const handleReconcile = async () => {
    setReconciling(true);
    try {
      const result = await reconcileSchedulesRequest();
      toast.success(result.message);

      if (result.reconciledCount > 0) {
        const refreshed = await fetchSchedules();
        setSchedules(refreshed);
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while reconciling schedules";

      toast.error(message);
      console.error("Failed to reconcile schedules:", error);
    } finally {
      setReconciling(false);
    }
  };

  useEffect(() => {
    async function loadSchedules() {
      try {
        const data = await fetchSchedules();
        setSchedules(data);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong while fetching schedules";

        toast.error(message);
        console.error("Failed to fetch schedules:", error);
      } finally {
        setLoading(false);
      }
    }

    loadSchedules();
  }, []);

  if (loading) return <p className="p-6">Loading schedules...</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold mb-4">Schedules</h2>

        {admin && (
          <button
            type="button"
            onClick={handleReconcile}
            disabled={reconciling}
            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 cursor-pointer transition"
          >
            {reconciling ? "Reconciling..." : "Reconcile Seats"}
          </button>
        )}
      </div>
      {schedules.length === 0 ? (
        <ScheduleEmptyState />
      ) : (
        <ScheduleTable
          schedules={schedules}
          isAdminUser={admin}
          onEdit={openEditModal}
          onDelete={openDeleteModal}
        />
      )}

      {isEditing && selectedSchedule && (
        <EditScheduleModal
          schedule={selectedSchedule}
          onClose={closeEditModal}
          onUpdated={updateSchedule}
        />
      )}

      {isDeleting && scheduleToDelete && (
        <DeleteScheduleModal
          schedule={scheduleToDelete}
          onClose={closeDeleteModal}
          onDeleted={removeDeletedSchedule}
        />
      )}
    </div>
  );
}

export default ManageSchedules;