export interface Schedule {
  id: number;
  trainName: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  capacity: number;
  availableSeats: number;
}

export interface ScheduleDTO {
  trainName: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  capacity: number;
}