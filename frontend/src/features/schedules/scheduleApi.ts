import { getAuthHeaders, getAuthJsonHeaders } from "../auth/authHeaders";
import type { Schedule } from "./scheduleTypes";
import type { ScheduleFormData } from "./scheduleSchema";
import { createScheduleDTO } from "./scheduleForm.dto";
import API_URL from "../../config/api";

const SCHEDULE_API_URL = `${API_URL}/schedules`;

export const createScheduleRequest = async (
  data: ScheduleFormData
): Promise<Schedule> => {
  const schedule = createScheduleDTO(data);

  const response = await fetch(SCHEDULE_API_URL, {
    method: "POST",
    headers: getAuthJsonHeaders(),
    body: JSON.stringify(schedule),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || result.error || "Failed to create schedule");
  }

  return result;
};

export const fetchSchedules = async (): Promise<Schedule[]> => {
  const response = await fetch(SCHEDULE_API_URL, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || data.error || "Failed to fetch schedules");
  }

  return data;
}

export const updateScheduleRequest = async (
  id: number,
  data: ScheduleFormData
): Promise<Schedule> => {
  const updatedSchedule = createScheduleDTO(data);

  const response = await fetch(`${SCHEDULE_API_URL}/${id}`, {
    method: "PUT",
    headers: getAuthJsonHeaders(),
    body: JSON.stringify(updatedSchedule),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || result.error || "Failed to update schedule");
  }

  return result;
}

export const deleteScheduleRequest = async (id: number): Promise<void> => {
  const response = await fetch(`${SCHEDULE_API_URL}/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || result.error || "Failed to delete schedule"
    );
  }
}
