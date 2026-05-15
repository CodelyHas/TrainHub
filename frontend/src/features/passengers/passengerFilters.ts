import type { Passenger } from "./passengerTypes";

export function filterPassengers(passengers: Passenger[], searchTerm: string) {
  const search = searchTerm.trim().toLowerCase();

  if (!search) return passengers;

  return passengers.filter((passenger) => {
    const status = passenger.status.toLowerCase();

    const matchesStatus =
      (search === "active" && status === "active") ||
      (search === "inactive" && status === "inactive");

    const matchesText =
      passenger.fullName.toLowerCase().includes(search) ||
      passenger.nationalId.toLowerCase().includes(search) ||
      passenger.phone.toLowerCase().includes(search) ||
      passenger.email?.toLowerCase().includes(search);

    return matchesStatus || matchesText;
  });
}