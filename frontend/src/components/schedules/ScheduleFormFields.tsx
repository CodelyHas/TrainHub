import type { FieldErrors, UseFormRegister } from "react-hook-form";
import FormInput from "../FormInput";
import type { ScheduleFormData } from "../../features/schedules/scheduleSchema";
import { cityNameCharactersOnly } from "../../utils/inputFormatting";

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
        onInput={(e) => {
          e.currentTarget.value = cityNameCharactersOnly(e.currentTarget.value);
        }}
        error={errors.departure?.message}
        {...register("departure")}
      />

      <FormInput
        label="Arrival"
        placeholder="Enter arrival city"
        onInput={(e) => {
          e.currentTarget.value = cityNameCharactersOnly(e.currentTarget.value);
        }}
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
        label="Economy Price"
        placeholder="Enter economy ticket price"
        inputMode="numeric"
        error={errors.economyPrice?.message}
        {...register("economyPrice", {
          onChange: (e) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, "");
          },
        })}
      />

      <FormInput
        label="Business Price"
        placeholder="Enter business ticket price"
        inputMode="numeric"
        error={errors.businessPrice?.message}
        {...register("businessPrice", {
          onChange: (e) => {
            e.target.value = e.target.value.replace(/[^0-9.]/g, "");
          },
        })}
      />

      <FormInput
        label="Economy Capacity"
        placeholder="Enter economy seat capacity"
        inputMode="numeric"
        error={errors.economyCapacity?.message}
        {...register("economyCapacity", {
          onChange: (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          },
        })}
      />

      <FormInput
        label="Business Capacity"
        placeholder="Enter business seat capacity"
        inputMode="numeric"
        error={errors.businessCapacity?.message}
        {...register("businessCapacity", {
          onChange: (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          },
        })}
      />
    </>
  );
}

export default ScheduleFormFields;