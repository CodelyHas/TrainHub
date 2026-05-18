import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import PassengerFormFields from "../components/passengers/PassengerFormFields";
import {
  passengerSchema,
  type PassengerFormData,
} from "../features/passengers/passengerSchema";
import { createPassengerRequest } from "../features/passengers/passengerApi";

function PassengerRegistrationForm() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PassengerFormData>({
    resolver: zodResolver(passengerSchema),
    defaultValues: {
      fullName: "",
      nationalId: "",
      phone: "",
      email: "",
      ageGroup: "ADULT",
      isStudent: false,
    },
  });

  const onSubmit = async (data: PassengerFormData) => {
    try {
      await createPassengerRequest(data);

      toast.success("Passenger registered successfully");
      reset({
        fullName: "",
        nationalId: "",
        phone: "",
        email: "",
        ageGroup: "ADULT",
        isStudent: false,
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong while registering the passenger";

      toast.error(errorMessage);
      console.error("Error registering passenger:", error);
    }
  };

  return (
    <div className="w-full">
      <form
        className="Form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <PassengerFormFields
          register={register}
          control={control}
          errors={errors}
        />

        <button className="cursor-pointer font-semibold" type="submit">
          Register Passenger
        </button>
      </form>
    </div>
  );
}

export default PassengerRegistrationForm;