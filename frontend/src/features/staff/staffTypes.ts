export interface Staff {
  id: number;
  fullName: string;
  email: string;
  role: "STAFF";
  isActive: boolean;
  createdAt: string;
}

export type StaffStatusAction = "deactivate" | "reactivate";