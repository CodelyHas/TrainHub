import type { AuthUser } from "./authTypes";

export const saveAuthSession = (token: string, user: AuthUser) => {
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
}

export const getAuthToken = () => {
  return localStorage.getItem("token");
}

export const getAuthUser = (): AuthUser | null => {
  const user = localStorage.getItem("user");

  if (!user) return null;

  return JSON.parse(user);
}

export const clearAuthSession = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export const isAdmin = () => {
  return getAuthUser()?.role === "ADMIN";
}

export const isStaff = () => {
  return getAuthUser()?.role === "STAFF";
}