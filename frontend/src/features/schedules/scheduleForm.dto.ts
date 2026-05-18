import type { ScheduleDTO } from "./scheduleTypes";
import type { ScheduleFormData } from "./scheduleSchema";

export const createScheduleDTO = (data: ScheduleFormData): ScheduleDTO => {
  return {
    trainName: data.trainName,
    departure: data.departure,
    arrival: data.arrival,
    departureTime: new Date(data.departureTime).toISOString(),
    arrivalTime: new Date(data.arrivalTime).toISOString(),

    economyPrice: Number(data.economyPrice),
    businessPrice: Number(data.businessPrice),

    economyCapacity: Number(data.economyCapacity),
    businessCapacity: Number(data.businessCapacity),
  };
};