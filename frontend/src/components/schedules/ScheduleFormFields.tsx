import type { FieldErrors, UseFormRegister } from "react-hook-form";
import FormInput from "../FormInput";
import type { ScheduleFormData } from "../../features/schedules/scheduleSchema";

interface ScheduleFormFieldsProps {
  register: UseFormRegister<ScheduleFormData>;
  errors: FieldErrors<ScheduleFormData>;
}

function ScheduleFormFields({ register, errors }: ScheduleFormFieldsProps) {
  return (
    <>
      <h2>Schedule Information</h2>

      <FormInput
        label="Train Name"
        placeholder="Enter train name"
        error={errors.trainName?.message}
        {...register("trainName")}
      />

      <FormInput
        label="Departure"
        placeholder="Enter departure city"
        error={errors.departure?.message}
        {...register("departure")}
      />

      <FormInput
        label="Arrival"
        placeholder="Enter arrival city"
        error={errors.arrival?.message}
        {...register("arrival")}
      />

      <FormInput
        label="Departure Time"
        type="datetime-local"
        error={errors.departureTime?.message}
        {...register("departureTime")}
      />

      <FormInput
        label="Arrival Time"
        type="datetime-local"
        error={errors.arrivalTime?.message}
        {...register("arrivalTime")}
      />

      <FormInput
        label="Price"
        placeholder="Enter ticket price"
        inputMode="numeric"
        error={errors.price?.message}
        {...register("price", {
          onChange: (e) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, "");
          },
        })}
      />

      <FormInput
        label="Capacity"
        placeholder="Enter train capacity"
        inputMode="numeric"
        error={errors.capacity?.message}
        {...register("capacity", {
          onChange: (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          },
        })}
      />
    </>
  );
}

export default ScheduleFormFields;