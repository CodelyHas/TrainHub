import { getAuthHeaders, getAuthJsonHeaders } from "../auth/authHeaders";
import type { Reservation } from "./reservationTypes";
import type { ReservationFormData } from "./reservationSchema";
import { createReservationDTO } from "./reservation.dto";
import API_URL from "../../config/api";

const RESERVATION_API_URL = `${API_URL}/reservations`;

export const fetchReservations = async (): Promise<Reservation[]> => {
  const response = await fetch(RESERVATION_API_URL, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || data.error || "Failed to fetch reservations"
    );
  }

  return data;
};

export const createReservationRequest = async (
  data: ReservationFormData
): Promise<Reservation> => {
  const reservation = createReservationDTO(data);

  const response = await fetch(RESERVATION_API_URL, {
    method: "POST",
    headers: getAuthJsonHeaders(),
    body: JSON.stringify(reservation),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || result.error || "Failed to create reservation"
    );
  }

  return result.reservation;
};

export const cancelReservationRequest = async (
  id: number
): Promise<Reservation> => {
  const response = await fetch(`${RESERVATION_API_URL}/${id}/cancel`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || result.error || "Failed to cancel reservation"
    );
  }

  return result.reservation;
};