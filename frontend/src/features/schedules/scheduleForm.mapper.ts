import type { Schedule } from "./scheduleTypes";
import type { ScheduleFormData } from "./scheduleSchema";

export function formatDateTimeLocal(dateString: string) {
  const date = new Date(dateString);
  const offset = date.getTimezoneOffset() * 60000;

  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export function scheduleToFormData(schedule: Schedule): ScheduleFormData {
  return {
    trainName: schedule.trainName,
    departure: schedule.departure,
    arrival: schedule.arrival,
    departureTime: formatDateTimeLocal(schedule.departureTime),
    arrivalTime: formatDateTimeLocal(schedule.arrivalTime),

    economyPrice: String(schedule.economyPrice),
    businessPrice: String(schedule.businessPrice),

    economyCapacity: String(schedule.economyCapacity),
    businessCapacity: String(schedule.businessCapacity),
  };
}