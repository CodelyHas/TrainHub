import type { ScheduleDTO } from "./scheduleTypes";
import type { ScheduleFormData } from "./scheduleSchema";

export const createScheduleDTO = (data: ScheduleFormData): ScheduleDTO => {
  return {
    trainName: data.trainName,
    departure: data.departure,
    arrival: data.arrival,
    departureTime: data.departureTime,
    arrivalTime: data.arrivalTime,
    price: Number(data.price),
    capacity: Number(data.capacity),
  };
}