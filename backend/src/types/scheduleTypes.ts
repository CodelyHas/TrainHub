interface ScheduleDTO {
  trainName: string;
  departure: string;
  arrival: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  capacity: number;
};

export default ScheduleDTO;