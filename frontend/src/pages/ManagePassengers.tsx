import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type { Passenger } from "../features/passengers/passengerTypes";
import {
  filterPassengers,
  type PassengerStatusFilter,
} from "../features/passengers/passengerFilters";
import { fetchPassengers } from "../features/passengers/passengerApi";

import PassengerStatusModal from "../components/passengers/PassengerStatusModal";
import EditPassengerModal from "../components/passengers/EditPassengerModal";
import PassengerTable from "../components/passengers/PassengerTable";
import PassengerEmptyState from "../components/passengers/PassengerEmptyState";

import { useEditModal } from "../hooks/useEditModal";
import { useStatusModal } from "../hooks/useStatusModal";
import { updateItemById } from "../utils/listUtils";

type StatusAction = "deactivate" | "reactivate";

function ManagePassengers() {
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
  useState<PassengerStatusFilter>("all");

  const {
    selectedItem: selectedPassenger,
    isEditing,
    openEditModal,
    closeEditModal,
  } = useEditModal<Passenger>();

  const {
    selectedItem: passengerToChangeStatus,
    action: statusAction,
    openStatusModal,
    closeStatusModal,
  } = useStatusModal<Passenger, StatusAction>();

  const handleDeactivateClick = (passenger: Passenger) => {
    openStatusModal(passenger, "deactivate");
  };

  const handleReactivateClick = (passenger: Passenger) => {
    openStatusModal(passenger, "reactivate");
  };

  const updatePassenger = (updatedPassenger: Passenger) => {
    setPassengers((prev) => updateItemById(prev, updatedPassenger));
    closeEditModal();
  };

  const updatePassengerStatus = (updatedPassenger: Passenger) => {
    setPassengers((prev) => updateItemById(prev, updatedPassenger));
    closeStatusModal();
  };

  useEffect(() => {
    async function loadPassengers() {
      try {
        const data = await fetchPassengers();
        setPassengers(data);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong while fetching passengers";

        toast.error(message);
        console.error("Failed to fetch passengers:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPassengers();
  }, []);

  if (loading) return <p className="p-6">Loading passengers...</p>;
  
  const filteredPassengers = filterPassengers(
    passengers,
    searchTerm,
    statusFilter
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Passengers</h2>

      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search passengers by name, national ID, phone, or email..."
            className="searchInput"
          />

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as PassengerStatusFilter)
            }
            className="filterButton"
          >
            <option value="all">All Passengers</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <p className="text-sm text-gray-500 whitespace-nowrap">
          Showing {filteredPassengers.length} of {passengers.length}
        </p>
      </div>

      {passengers.length === 0 ? (
        <PassengerEmptyState />
      ) : filteredPassengers.length === 0 ? (
        <p>No matching passengers found.</p>
      ) : (
        <PassengerTable
          passengers={filteredPassengers}
          onEdit={openEditModal}
          onDeactivate={handleDeactivateClick}
          onReactivate={handleReactivateClick}
        />
      )}

      {isEditing && selectedPassenger && (
        <EditPassengerModal
          passenger={selectedPassenger}
          onClose={closeEditModal}
          onUpdated={updatePassenger}
        />
      )}

      {passengerToChangeStatus && statusAction && (
        <PassengerStatusModal
          passenger={passengerToChangeStatus}
          action={statusAction}
          onClose={closeStatusModal}
          onStatusChanged={updatePassengerStatus}
        />
      )}
    </div>
  );
}

export default ManagePassengers;