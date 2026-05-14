import type { Staff } from "./staffTypes";
import type { EditStaffFormData } from "./staffSchema";

export const staffToFormData = (staff: Staff): EditStaffFormData => {
  return {
    fullName: staff.fullName,
    email: staff.email,
  };
};