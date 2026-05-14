import { getAuthHeaders, getAuthJsonHeaders } from "../auth/authHeaders";
import type { Staff } from "./staffTypes";
import type {
  CreateStaffFormData,
  EditStaffFormData,
} from "./staffSchema";
import { createStaffDTO, updateStaffDTO } from "./staff.dto";
import API_URL from "../../config/api";

const STAFF_API_URL = `${API_URL}/users/staff`;

export const fetchStaffAccounts = async (): Promise<Staff[]> => {
  const response = await fetch(STAFF_API_URL, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch staff accounts");
  }

  return data;
}

export const createStaffAccount = async (
  data: CreateStaffFormData
): Promise<Staff> => {
  const response = await fetch(STAFF_API_URL, {
    method: "POST",
    headers: getAuthJsonHeaders(),
    body: JSON.stringify(createStaffDTO(data)),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create staff account");
  }

  return result.staff;
}

export const updateStaffAccount = async (
  id: number,
  data: EditStaffFormData
): Promise<Staff> => {
  const response = await fetch(`${STAFF_API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthJsonHeaders(),
    body: JSON.stringify(updateStaffDTO(data)),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update staff account");
  }

  return result.staff;
}

export const updateStaffAccountStatus = async (
  id: number,
  isActive: boolean
): Promise<Staff> => {
  const response = await fetch(`${STAFF_API_URL}/${id}/status`, {
    method: "PATCH",
    headers: getAuthJsonHeaders(),
    body: JSON.stringify({ isActive }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to update staff status");
  }

  return result.staff;
}