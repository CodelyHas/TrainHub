import type { Passenger } from "./passengerTypes";

export type PassengerStatusFilter = "all" | "ACTIVE" | "INACTIVE";

export function filterPassengers(
  passengers: Passenger[],
  searchTerm: string,
  statusFilter: PassengerStatusFilter
) {
  const search = searchTerm.trim().toLowerCase();

  return passengers.filter((passenger) => {
    const matchesSearch =
      !search ||
      passenger.fullName.toLowerCase().includes(search) ||
      passenger.nationalId.toLowerCase().includes(search) ||
      passenger.phone.toLowerCase().includes(search) ||
      passenger.email?.toLowerCase().includes(search);

    const matchesStatus =
      statusFilter === "all" || passenger.status === statusFilter;

    return matchesSearch && matchesStatus;
  });
}