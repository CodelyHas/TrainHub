import { getAuthToken } from "./authStorage";

export const getAuthHeaders = () => {
  const token = getAuthToken();

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getAuthJsonHeaders = () => {
  const token = getAuthToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};