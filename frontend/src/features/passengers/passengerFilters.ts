import type { Passenger } from "./passengerTypes";

export function filterPassengers(
  passengers: Passenger[],
  searchTerm: string
) {
  const search = searchTerm.trim().toLowerCase();

  if (!search) return passengers;

  return passengers.filter((p) => {
    return (
      p.fullName.toLowerCase().includes(search) ||
      p.nationalId.toLowerCase().includes(search) ||
      p.phone.toLowerCase().includes(search) ||
      (p.email || "").toLowerCase().includes(search) ||
      p.status.toLowerCase().includes(search)
    );
  });
}