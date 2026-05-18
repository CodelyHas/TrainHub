import type ScheduleDTO from "../types/scheduleTypes";

export const createScheduleDTO = (data: ScheduleDTO) => {
  const economyCapacity = Number(data.economyCapacity);
  const businessCapacity = Number(data.businessCapacity);

  return {
    trainName: data.trainName,
    departure: data.departure,
    arrival: data.arrival,
    departureTime: new Date(data.departureTime),
    arrivalTime: new Date(data.arrivalTime),

    economyPrice: Number(data.economyPrice),
    businessPrice: Number(data.businessPrice),

    economyCapacity,
    businessCapacity,

    economyAvailableSeats: economyCapacity,
    businessAvailableSeats: businessCapacity,
  };
};

export const updateScheduleDTO = (data: ScheduleDTO) => {
  return {
    trainName: data.trainName,
    departure: data.departure,
    arrival: data.arrival,
    departureTime: new Date(data.departureTime),
    arrivalTime: new Date(data.arrivalTime),

    economyPrice: Number(data.economyPrice),
    businessPrice: Number(data.businessPrice),

    economyCapacity: Number(data.economyCapacity),
    businessCapacity: Number(data.businessCapacity),
  };
};