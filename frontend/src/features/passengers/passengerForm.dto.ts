import type { PassengerFormData } from "./passengerSchema";

export const createPassengerDTO = (data: PassengerFormData) => {
  return {
    fullName: data.fullName,
    nationalId: data.nationalId,
    phone: data.phone,
    email: data.email || null,
    ageGroup: data.ageGroup,
    isStudent: data.isStudent,
  };
};