import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import ScheduleFormFields from "./ScheduleFormFields";
import type { Schedule } from "../../features/schedules/scheduleTypes";
import {
  getScheduleSchema,
  type ScheduleFormData,
} from "../../features/schedules/scheduleSchema";
import { scheduleToFormData } from "../../features/schedules/scheduleForm.mapper";
import { updateScheduleRequest } from "../../features/schedules/scheduleApi";

interface Props {
  schedule: Schedule;
  onClose: () => void;
  onUpdated: (updatedSchedule: Schedule) => void;
}

function EditScheduleModal({ schedule, onClose, onUpdated }: Props) {
  /*For backend errors*/
  const [submitError, setSubmitError] = useState("");

  /*For frontend(zod) errors*/
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(getScheduleSchema("edit")),
    defaultValues: scheduleToFormData(schedule),
  });

  useEffect(() => {
    reset(scheduleToFormData(schedule));
  }, [schedule, reset]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

    const onSubmit = async (data: ScheduleFormData) => {
      try {
        setSubmitError("");

        const updatedSchedule = await updateScheduleRequest(schedule.id, data);

        onUpdated(updatedSchedule);
        toast.success("Schedule updated successfully");
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Something went wrong while updating the schedule.";

        setSubmitError(errorMessage);
        toast.error(errorMessage);
        console.error("Error updating schedule:", error);
      }
    };

  return (
    <div className="modalContainer">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          Editing {schedule.trainName}
        </h2>

        <form
          className="editScheduleForm"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
        <ScheduleFormFields register={register} errors={errors} />
          {submitError && (
            <p className="mt-4 text-sm font-medium text-red-600">
              {submitError}
            </p>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="hover:cursor-pointer hover:bg-gray-800 bg-gray-700 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="hover:cursor-pointer hover:bg-blue-700 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditScheduleModal;