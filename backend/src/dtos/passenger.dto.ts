import type PassengerDTO from "../types/passengerTypes";
import {
  encryptNationalId,
  decryptNationalId,
  hashNationalId,
} from "../utils/encryptions.ts";

export const createPassengerDTO = (data: PassengerDTO) => {
  return {
    fullName: data.fullName,
    nationalId: encryptNationalId(data.nationalId),
    nationalIdHash: hashNationalId(data.nationalId),
    phone: data.phone,
    email: data.email || null,
    ageGroup: data.ageGroup || "ADULT",
    isStudent: Boolean(data.isStudent),
  };
};

export const formatPassengerResponseDTO = (passenger: any) => {
  const { nationalIdHash, ...safePassenger } = passenger;

  return {
    ...safePassenger,
    nationalId: decryptNationalId(passenger.nationalId),
  };
};