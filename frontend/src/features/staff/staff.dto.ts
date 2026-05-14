import type {
  CreateStaffFormData,
  EditStaffFormData,
} from "./staffSchema";

export const createStaffDTO = (data: CreateStaffFormData) => {
  return {
    fullName: data.fullName,
    email: data.email,
    password: data.password,
  };
};

export const updateStaffDTO = (data: EditStaffFormData) => {
  return {
    fullName: data.fullName,
    email: data.email,
  };
};