export type AgeGroup = "ADULT" | "CHILD";

export interface Passenger {
  id: number;
  fullName: string;
  nationalId: string;
  phone: string;
  email: string | null;
  status: "ACTIVE" | "INACTIVE";
  ageGroup: AgeGroup;
  isStudent: boolean;
  createdAt?: string;
}

export interface PassengerDTO {
  fullName: string;
  nationalId: string;
  phone: string;
  email: string | null;
  ageGroup: AgeGroup;
  isStudent: boolean;
}