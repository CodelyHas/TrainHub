import type { Passenger } from "./passengerTypes";
import type { PassengerFormData } from "./passengerSchema";

export const passengerToFormData = (
  passenger: Passenger
): PassengerFormData => {
  return {
    fullName: passenger.fullName,
    nationalId: passenger.nationalId,
    phone: passenger.phone,
    email: passenger.email || "",
    ageGroup: passenger.ageGroup || "ADULT",
    isStudent: passenger.isStudent || false,
  };
};