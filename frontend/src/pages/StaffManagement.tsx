import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import StaffFormModal from "../components/staff/StaffFormModal";
import StaffStatusModal from "../components/staff/StaffStatusModal";
import StaffTable from "../components/staff/StaffTable";
import StaffEmptyState from "../components/staff/StaffEmptyState";

import type { Staff, StaffStatusAction } from "../features/staff/staffTypes";
import { fetchStaffAccounts } from "../features/staff/staffApi";

import { useEditModal } from "../hooks/useEditModal";
import { useStatusModal } from "../hooks/useStatusModal";
import { useCreateModal } from "../hooks/useCreateModal";
import { updateItemById } from "../utils/listUtils";

function StaffManagement() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  const { isCreating, openCreateModal, closeCreateModal } = useCreateModal();

  const {
    selectedItem: selectedStaff,
    isEditing,
    openEditModal,
    closeEditModal,
  } = useEditModal<Staff>();

  const {
    selectedItem: staffToChangeStatus,
    action: statusAction,
    openStatusModal,
    closeStatusModal,
  } = useStatusModal<Staff, StaffStatusAction>();

  const handleStatusClick = (staff: Staff) => {
    openStatusModal(staff, staff.isActive ? "deactivate" : "reactivate");
  };

  const addCreatedStaff = (createdStaff: Staff) => {
    setStaffList((prev) => [createdStaff, ...prev]);
  };

  const updateStaff = (updatedStaff: Staff) => {
    setStaffList((prev) => updateItemById(prev, updatedStaff));
    closeEditModal();
  };

  const updateStaffStatus = (updatedStaff: Staff) => {
    setStaffList((prev) => updateItemById(prev, updatedStaff));
    closeStatusModal();
  };

  useEffect(() => {
    async function fetchStaff() {
      try {
        const data = await fetchStaffAccounts();
        setStaffList(data);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong while fetching staff accounts";

        toast.error(message);
        console.error("Error fetching staff:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStaff();
  }, []);

  if (loading) return <p className="p-6">Loading staff accounts...</p>;

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Staff Management
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Create staff accounts and manage employee access.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateModal}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 cursor-pointer transition"
        >
          <i className="fa-solid fa-user-plus mr-2"></i>
          Create Staff
        </button>
      </div>

      {staffList.length === 0 ? (
        <StaffEmptyState />
      ) : (
        <StaffTable
          staffList={staffList}
          onEdit={openEditModal}
          onStatusClick={handleStatusClick}
        />
      )}

      {isCreating && (
        <StaffFormModal
          mode="create"
          onClose={closeCreateModal}
          onCreated={addCreatedStaff}
        />
      )}

      {isEditing && selectedStaff && (
        <StaffFormModal
          mode="edit"
          staff={selectedStaff}
          onClose={closeEditModal}
          onUpdated={updateStaff}
        />
      )}

      {staffToChangeStatus && statusAction && (
        <StaffStatusModal
          staff={staffToChangeStatus}
          action={statusAction}
          onClose={closeStatusModal}
          onStatusChanged={updateStaffStatus}
        />
      )}
    </div>
  );
}

export default StaffManagement;