export interface Schedule {
  id: number;
  trainName: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;

  economyPrice: number;
  businessPrice: number;

  economyCapacity: number;
  businessCapacity: number;

  economyAvailableSeats: number;
  businessAvailableSeats: number;
}

export interface ScheduleDTO {
  trainName: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;

  economyPrice: number;
  businessPrice: number;

  economyCapacity: number;
  businessCapacity: number;
}