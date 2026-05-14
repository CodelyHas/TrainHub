export type UserRole = "ADMIN" | "STAFF";

export interface AuthUser {
  id: number;
  fullName: string;
  email: string;
  role: UserRole;
}