import type PassengerDTO from "../types/passengerTypes";

export const createPassengerDTO = (data: PassengerDTO) => {
  return {
    fullName: data.fullName,
    nationalId: data.nationalId,
    phone: data.phone,
    email: data.email || null,
  };
};