import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import type { Passenger } from "../../features/passengers/passengerTypes";
import {
  passengerSchema,
  type PassengerFormData,
} from "../../features/passengers/passengerSchema";
import { passengerToFormData } from "../../features/passengers/passengerForm.mapper";
import { updatePassengerRequest } from "../../features/passengers/passengerApi";

interface Props {
  passenger: Passenger;
  onClose: () => void;
  onUpdated: (updatedPassenger: Passenger) => void;
}

function EditPassengerModal({ passenger, onClose, onUpdated }: Props) {
  const [submitError, setSubmitError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PassengerFormData>({
    resolver: zodResolver(passengerSchema),
    defaultValues: passengerToFormData(passenger),
  });

  useEffect(() => {
    reset(passengerToFormData(passenger));
  }, [passenger, reset]);

  useEffect(() => {
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const onSubmit = async (data: PassengerFormData) => {
    try {
      setSubmitError("");

      const updatedPassenger = await updatePassengerRequest(passenger.id, data);

      onUpdated(updatedPassenger);
      toast.success("Passenger updated successfully");
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Something went wrong while updating the passenger.";

      setSubmitError(errorMessage);
      toast.error(errorMessage);
      console.error("Error updating passenger:", error);
    }
  };

  return (
    <div className="modalContainer">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">
          Editing {passenger.fullName}
        </h2>

        <form className="editScheduleForm" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Full Name
            </label>
            <input {...register("fullName")} />
            {errors.fullName && (
              <p className="text-sm text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              National ID
            </label>
            <input {...register("nationalId")} />
            {errors.nationalId && (
              <p className="text-sm text-red-600">
                {errors.nationalId.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Phone
            </label>
            <input {...register("phone")} />
            {errors.phone && (
              <p className="text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="font-semibold text-sm text-gray-700">
              Email
            </label>
            <input {...register("email")} />
            {errors.email && (
              <p className="text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {submitError && (
            <p className="mt-2 text-sm font-medium text-red-600">
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

export default EditPassengerModal;