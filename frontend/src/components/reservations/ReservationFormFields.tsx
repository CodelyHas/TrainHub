import type { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { Controller } from "react-hook-form";
import Select from "react-select";

import type { Schedule } from "../../features/schedules/scheduleTypes";
import type { Passenger } from "../../features/passengers/passengerTypes";
import type { ReservationFormData } from "../../features/reservations/reservationSchema";

import FormInput from "../FormInput";
import DropdownIndicator, { type ScheduleOption } from "./DropdownIndicator";

interface ReservationFormFieldsProps {
  schedules: Schedule[];
  passengers: Passenger[];
  register: UseFormRegister<ReservationFormData>;
  control: Control<ReservationFormData>;
  errors: FieldErrors<ReservationFormData>;
}

interface PassengerOption {
  value: string;
  label: string;
}

function ReservationFormFields({
  schedules,
  passengers,
  register,
  control,
  errors,
}: ReservationFormFieldsProps) {

  const passengerOptions: PassengerOption[] = passengers.map((passenger) => ({
    value: passenger.nationalId,
    label: `${passenger.fullName} | ${passenger.nationalId}`,
  }));

  const scheduleOptions: ScheduleOption[] = schedules.map((schedule) => {
    const hasDeparted = new Date(schedule.departureTime) <= new Date();

    return {
      value: String(schedule.id),
      label: `${schedule.trainName} | ${schedule.departure} → ${
        schedule.arrival
      } | ${new Date(schedule.departureTime).toLocaleString()} | ${
        schedule.price
      } SAR${hasDeparted ? " | Departed" : ""}`,
      isDisabled: hasDeparted,
    };
  });

  const selectClassNames = {
    control: () =>
      "min-h-11! h-11! border-gray-300!",
    valueContainer: () =>
      "h-11! px-3! py-0! flex! items-center!",
    placeholder: () =>
      "m-0! text-gray-500!",
    singleValue: () =>
      "m-0!",
    input: () =>
      "m-0! p-0! absolute! left-3! right-3! [&_input:focus]:shadow-none! [&_input:focus]:outline-none! [&_input:focus]:[--tw-ring-shadow:0_0_#0000]!",
    indicatorsContainer: () =>
      "h-11!",
    option: (state: { isDisabled: boolean; isFocused: boolean }) =>
      state.isDisabled
        ? "text-gray-300! bg-white! cursor-not-allowed!"
        : state.isFocused
        ? "bg-blue-100! text-gray-900!"
        : "bg-white! text-gray-900!",
  };

  return (
    <>
      <h2>Ticket Reservation Information</h2>

      <div>
        <label className="block mb-2">Passenger</label>

        <Controller
          name="nationalId"
          control={control}
          render={({ field }) => (
            <Select<PassengerOption, false>
              options={passengerOptions}
              value={
                passengerOptions.find((option) => option.value === field.value) || null
              }
              onChange={(option) => field.onChange(option?.value || "")}
              placeholder="Select passenger"
              isSearchable
              classNames={selectClassNames}
              components={{ DropdownIndicator }}
            />
          )}
        />

        {errors.nationalId?.message && (
          <p className="text-red-500 text-sm mt-1">
            {errors.nationalId.message}
          </p>
        )}
      </div>

      <div>
        <label className="block mb-2">Train Schedule</label>

        <Controller
          name="scheduleId"
          control={control}
          render={({ field }) => (
            <Select<ScheduleOption, false>
              options={scheduleOptions}
              value={
                scheduleOptions.find((option) => option.value === field.value) || null
              }
              onChange={(option) => field.onChange(option?.value || "")}
              placeholder="Select train schedule"
              isSearchable={false}
              isOptionDisabled={(option) => option.isDisabled === true}
              classNames={selectClassNames}
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