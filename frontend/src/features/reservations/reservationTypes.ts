export type SeatClass = "ECONOMY" | "BUSINESS";
export type DiscountType = "NONE" | "CHILD" | "STUDENT";
export type AgeGroup = "ADULT" | "CHILD";

export interface Reservation {
  id: number;
  passengerName: string;
  nationalId?: string;
  ageGroup?: AgeGroup;
  isStudent?: boolean;

  trainName: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;

  seatClass: SeatClass;
  seatCount: number;

  originalPrice: number;
  discountType: DiscountType;
  discountRate: number;
  totalPrice: number;

  status: "CONFIRMED" | "CANCELLED" | "COMPLETED";
  createdAt?: string;
}