import type { ScheduleDTO } from "./scheduleTypes";
import type { ScheduleFormData } from "./scheduleSchema";

export const createScheduleDTO = (data: ScheduleFormData): ScheduleDTO => {
  return {
    trainName: data.trainName,
    departure: data.departure,
    arrival: data.arrival,
    departureTime: new Date(data.departureTime).toISOString(),
    arrivalTime: new Date(data.arrivalTime).toISOString(),
    price: Number(data.price),
    capacity: Number(data.capacity),
  };
};