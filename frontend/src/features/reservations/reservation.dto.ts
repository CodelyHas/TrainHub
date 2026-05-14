import type { ReservationFormData } from "./reservationSchema";

export const createReservationDTO = (data: ReservationFormData) => {
  return {
    nationalId: data.nationalId,
    scheduleId: Number(data.scheduleId),
    seatCount: Number(data.seatCount),
  };
}