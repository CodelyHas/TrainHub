import { getAuthHeaders, getAuthJsonHeaders } from "../auth/authHeaders";
import type { Passenger } from "./passengerTypes";
import type { PassengerFormData } from "./passengerSchema";
import { createPassengerDTO } from "./passengerForm.dto";
import API_URL from "../../config/api";

const PASSENGER_API_URL = `${API_URL}/passengers`;

export const fetchPassengers = async (): Promise<Passenger[]> => {
  const response = await fetch(PASSENGER_API_URL, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || data.error || "Failed to fetch passengers"
    );
  }

  return data;
};

export const createPassengerRequest = async (
  data: PassengerFormData
): Promise<Passenger> => {
  const passenger = createPassengerDTO(data);

  const response = await fetch(PASSENGER_API_URL, {
    method: "POST",
    headers: getAuthJsonHeaders(),
    body: JSON.stringify(passenger),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || result.error || "Failed to register passenger"
    );
  }

  return result.passenger;
};

export const updatePassengerRequest = async (
  id: number,
  data: PassengerFormData
): Promise<Passenger> => {
  const passenger = createPassengerDTO(data);

  const response = await fetch(`${PASSENGER_API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthJsonHeaders(),
    body: JSON.stringify(passenger),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || result.error || "Failed to update passenger"
    );
  }

  return result;
};

export const updatePassengerStatusRequest = async (
  id: number,
  status: "ACTIVE" | "INACTIVE"
): Promise<Passenger> => {
  const response = await fetch(`${PASSENGER_API_URL}/${id}/status`, {
    method: "PATCH",
    headers: getAuthJsonHeaders(),
    body: JSON.stringify({ status }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || result.error || "Failed to update passenger status"
    );
  }

  return result.passenger;
};