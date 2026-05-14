import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";
import Select from "react-select";
import type { Schedule } from "../../features/schedules/scheduleTypes";
import type { ReservationFormData } from "../../features/reservations/reservationSchema";
import FormInput from "../FormInput";
import DropdownIndicator, { type ScheduleOption } from "./DropdownIndicator";

interface ReservationFormFieldsProps {
  schedules: Schedule[];
  register: UseFormRegister<ReservationFormData>;
  control: Control<ReservationFormData>;
  errors: FieldErrors<ReservationFormData>;
}

function ReservationFormFields({schedules, register, control, errors,}: ReservationFormFieldsProps) {
    const scheduleOptions = schedules.map((schedule) => ({
        value: String(schedule.id),
        label: `${schedule.trainName} | ${schedule.departure} → ${schedule.arrival} 
        | ${new Date(schedule.departureTime).toLocaleString()} | ${schedule.price} SAR`,}));

  return (
    <>
        <h2>Ticket Reservation Information</h2>

        <FormInput
            label="Passenger National ID"
            placeholder="Enter passenger national ID"
            inputMode="numeric"
            error={errors.nationalId?.message}
            {...register("nationalId", {
            onChange: (e) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
            },
            })}
        />

        <div>
        <label className="block mb-2">Train Schedule</label>

        <Controller
            name="scheduleId"
            control={control}
            render={({ field }) => (
            <Select<ScheduleOption, false>
            options={scheduleOptions}
            value={scheduleOptions.find((option) => option.value === field.value) || null}
            onChange={(option) => field.onChange(option?.value || "")}
            placeholder="Select train schedule"
            isSearchable={false}
            components={{ DropdownIndicator }}
            />
            )}
        />

        {errors.scheduleId?.message && (
            <p className="text-red-500 text-sm mt-1">
            {errors.scheduleId.message}
            </p>
        )}
        </div>

      <FormInput
        label="Seat Count"
        placeholder="Enter number of seats"
        inputMode="numeric"
        error={errors.seatCount?.message}
        {...register("seatCount", {
          onChange: (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          },
        })}
      />
    </>
  );
}

export default ReservationFormFields;