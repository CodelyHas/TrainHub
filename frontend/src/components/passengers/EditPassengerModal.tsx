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

import PassengerFormFields from "./PassengerFormFields";

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
    formState: { errors, isSubmitting },
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
      onClose();
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
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
            <i className="fa-solid fa-user-pen"></i>
          </div>

          <h2 className="text-xl font-bold text-gray-900">
            Edit Passenger
          </h2>
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Update passenger information for{" "}
          <span className="font-semibold">{passenger.fullName}</span>.
        </p>

        <form
          className="editScheduleForm"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          autoComplete="off"
        >
          <PassengerFormFields register={register} errors={errors} />

          {submitError && (
            <p className="mt-2 text-sm font-medium text-red-600">
              {submitError}
            </p>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="hover:cursor-pointer hover:bg-gray-800 bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-60"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="hover:cursor-pointer hover:bg-blue-700 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditPassengerModal;