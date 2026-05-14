import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type { Reservation } from "../features/reservations/reservationTypes";
import { fetchReservations } from "../features/reservations/reservationApi";
import { updateItemById } from "../utils/listUtils";

import CancelReservationModal from "../components/reservations/CancelReservationModal";
import BookingConfirmationModal from "../components/reservations/BookingConfirmationModal";
import ReservationTable from "../components/reservations/ReservationTable";
import ReservationEmptyState from "../components/reservations/ReservationEmptyState";

import { useStatusModal } from "../hooks/useStatusModal";

function ManageReservations() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedReceipt, setSelectedReceipt] =
    useState<Reservation | null>(null);

  const [statusFilter, setStatusFilter] = useState("ALL");

  const {
    selectedItem: reservationToCancel,
    openStatusModal: openCancelModal,
    closeStatusModal: closeCancelModal,
  } = useStatusModal<Reservation, "cancel">();

  const filteredReservations = reservations.filter((reservation) => {
    if (statusFilter === "ALL") return true;
    return reservation.status === statusFilter;
  });

  const handleViewReceiptClick = (reservation: Reservation) => {
    setSelectedReceipt(reservation);
  };

  const closeReceipt = () => {
    setSelectedReceipt(null);
  };

  const handleCancelClick = (reservation: Reservation) => {
    openCancelModal(reservation, "cancel");
  };

  const updateCancelledReservation = (updatedReservation: Reservation) => {
    setReservations((prev) => updateItemById(prev, updatedReservation));
  };

  useEffect(() => {
    async function loadReservations() {
      try {
        const data = await fetchReservations();
        setReservations(data);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong while fetching reservations";

        toast.error(message);
        console.error("Failed to fetch reservations:", error);
      } finally {
        setLoading(false);
      }
    }

    loadReservations();
  }, []);

  if (loading) return <p className="p-6">Loading reservations...</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Reservations</h2>

      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="filterButton"
      >
        <option value="ALL">All Reservations</option>
        <option value="CONFIRMED">Confirmed</option>
        <option value="CANCELLED">Cancelled</option>
      </select>

      {reservations.length === 0 ? (
        <ReservationEmptyState />
      ) : filteredReservations.length === 0 ? (
        <p>No matching reservations found.</p>
      ) : (
        <ReservationTable
          reservations={filteredReservations}
          onViewReceipt={handleViewReceiptClick}
          onCancel={handleCancelClick}
        />
      )}

      {selectedReceipt && (
        <BookingConfirmationModal
          reservation={selectedReceipt}
          onClose={closeReceipt}
        />
      )}

      {reservationToCancel && (
        <CancelReservationModal
          reservation={reservationToCancel}
          onClose={closeCancelModal}
          onCancelled={updateCancelledReservation}
        />
      )}
    </div>
  );
}

export default ManageReservations;