import type { FieldErrors, UseFormRegister } from "react-hook-form";
import FormInput from "../FormInput";
import type { PassengerFormData } from "../../features/passengers/passengerSchema";
import { lettersAndSpacesOnly } from "../../utils/inputFormatting";

interface PassengerFormFieldsProps {
  register: UseFormRegister<PassengerFormData>;
  errors: FieldErrors<PassengerFormData>;
}

function PassengerFormFields({ register, errors }: PassengerFormFieldsProps) {
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
    </>
  );
}

export default PassengerFormFields;