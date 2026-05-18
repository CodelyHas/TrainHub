import type {
  Control,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { Controller } from "react-hook-form";
import Select from "react-select";
import type { ClassNamesConfig } from "react-select";

import FormInput from "../FormInput";
import type { PassengerFormData } from "../../features/passengers/passengerSchema";
import { lettersAndSpacesOnly } from "../../utils/inputFormatting";
import DropdownIndicator, {
  type SelectOption,
} from "../reservations/DropdownIndicator";

interface PassengerFormFieldsProps {
  register: UseFormRegister<PassengerFormData>;
  control: Control<PassengerFormData>;
  errors: FieldErrors<PassengerFormData>;
}

function PassengerFormFields({
  register,
  control,
  errors,
}: PassengerFormFieldsProps) {
  const ageGroupOptions: SelectOption[] = [
    { value: "ADULT", label: "Adult" },
    { value: "CHILD", label: "Child" },
  ];

  const selectClassNames: ClassNamesConfig<SelectOption, false> = {
    control: (state) =>
      `min-h-11! h-11! rounded-md! border! border-gray-300! shadow-none! outline-none! ${
        state.isFocused ? "ring-2! ring-blue-400!" : "ring-0!"
      }`,

    valueContainer: () => "h-11! px-3! py-0! flex! items-center!",

    placeholder: () => "m-0! text-gray-500!",

    singleValue: () => "m-0!",

    input: () =>
      "m-0! p-0! [&_input:focus]:shadow-none! [&_input:focus]:outline-none! [&_input:focus]:[--tw-ring-shadow:0_0_#0000]!",

    indicatorsContainer: () => "h-11!",

    option: (state) =>
      state.isFocused
        ? "bg-blue-100! text-gray-900!"
        : "bg-white! text-gray-900!",
  };

  return (
    <>
      <h2>Passenger Information</h2>

      <FormInput
        label="Full Name"
        placeholder="Enter passenger full name"
        onInput={(e) => {
          e.currentTarget.value = lettersAndSpacesOnly(e.currentTarget.value);
        }}
        error={errors.fullName?.message}
        {...register("fullName")}
      />

      <FormInput
        label="National ID"
        placeholder="Enter passenger national ID"
        error={errors.nationalId?.message}
        inputMode="numeric"
        {...register("nationalId", {
          onChange: (e) => {
            e.target.value = e.target.value.replace(/[^0-9]/g, "");
          },
        })}
      />

      <FormInput
        label="Phone Number"
        type="tel"
        placeholder="Enter passenger phone number"
        error={errors.phone?.message}
        inputMode="numeric"
        {...register("phone")}
        onInput={(e) => {
          e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
        }}
      />

      <FormInput
        label="Email"
        type="email"
        placeholder="Enter passenger email address"
        error={errors.email?.message}
        {...register("email")}
      />

      <div>
        <label className="block mb-2">Age Group</label>

        <Controller
          name="ageGroup"
          control={control}
          render={({ field }) => (
            <Select<SelectOption, false>
              options={ageGroupOptions}
              value={
                ageGroupOptions.find(
                  (option) => option.value === field.value
                ) || null
              }
              onChange={(option) => field.onChange(option?.value || "ADULT")}
              placeholder="Select age group"
              isSearchable={false}
              classNames={selectClassNames}
              components={{ DropdownIndicator }}
            />
          )}
        />

        {errors.ageGroup?.message && (
          <p className="text-red-500 text-sm mt-1">
            {errors.ageGroup.message}
          </p>
        )}
      </div>

      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          className="h-4! w-4! p-0! cursor-pointer"
          {...register("isStudent")}
        />

        <span>Student</span>
      </label>

      {errors.isStudent?.message && (
        <p className="text-red-500 text-sm">
          {errors.isStudent.message}
        </p>
      )}
    </>
  );
}

export default PassengerFormFields;