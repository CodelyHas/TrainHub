interface ReservationDTO {
  nationalId: string;
  scheduleId: number;
  seatClass: "ECONOMY" | "BUSINESS";
  seatCount: number;
}

export default ReservationDTO;