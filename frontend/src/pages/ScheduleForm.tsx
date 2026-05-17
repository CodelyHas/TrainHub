import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import ScheduleFormFields from "../components/schedules/ScheduleFormFields";
import {
  getScheduleSchema,
  type ScheduleFormData,
} from "../features/schedules/scheduleSchema";
import { createScheduleRequest } from "../features/schedules/scheduleApi";

function ScheduleForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ScheduleFormData>({
    resolver: zodResolver(getScheduleSchema("create")),
  });

  const onSubmit = async (data: ScheduleFormData) => {
    try {
      const createdSchedule = await createScheduleRequest(data);

      console.log("Saved to DB:", createdSchedule);
      toast.success("Schedule created successfully");
      reset();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong while creating the schedule";

      toast.error(errorMessage);
      console.error("Error creating schedule:", error);
    }
  };

  return (
    <div className="w-full">
      <form className="Form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
        <ScheduleFormFields register={register} errors={errors} />

        <button className="cursor-pointer font-semibold" type="submit">
          Create Schedule
        </button>
      </form>
    </div>
  );
}

export default ScheduleForm;