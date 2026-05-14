import type ScheduleDTO from "../types/scheduleTypes";

export const createScheduleDTO = (data: ScheduleDTO) => {
  return {
    trainName: data.trainName,
    departure: data.departure,
    arrival: data.arrival,
    departureTime: new Date(data.departureTime),
    arrivalTime: new Date(data.arrivalTime),
    price: Number(data.price),
    capacity: Number(data.capacity),
    availableSeats: Number(data.capacity),
  };
};

export const updateScheduleDTO = (data: ScheduleDTO) => {
  return {
    trainName: data.trainName,
    departure: data.departure,
    arrival: data.arrival,
    departureTime: new Date(data.departureTime),
    arrivalTime: new Date(data.arrivalTime),
    price: Number(data.price),
    capacity: Number(data.capacity),
  };
};