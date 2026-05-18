interface PassengerDTO {
  fullName: string;
  nationalId: string;
  phone: string;
  email?: string;
  status?: string;
  ageGroup?: "ADULT" | "CHILD";
  isStudent?: boolean;
}

export default PassengerDTO;