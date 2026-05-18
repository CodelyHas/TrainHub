interface ScheduleDTO {
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

export default ScheduleDTO;