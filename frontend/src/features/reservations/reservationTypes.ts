export interface Reservation {
  id: number;
  passengerName: string;
  nationalId?: string;
  trainName: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  seatCount: number;
  totalPrice: number;
  status: "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt?: string;
}