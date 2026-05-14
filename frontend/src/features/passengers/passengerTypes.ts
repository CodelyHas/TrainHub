export interface Passenger {
  id: number;
  fullName: string;
  nationalId: string;
  phone: string;
  email: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt?: string;
}

export interface PassengerDTO {
  fullName: string;
  nationalId: string;
  phone: string;
  email: string | null;
}

