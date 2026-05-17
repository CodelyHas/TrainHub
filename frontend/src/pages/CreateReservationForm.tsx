import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import ReservationFormFields from "../components/reservations/ReservationFormFields";

import type { Schedule } from "../features/schedules/scheduleTypes";
import type { Passenger } from "../features/passengers/passengerTypes";

import {
  reservationSchema,
  type ReservationFormData,
} from "../features/reservations/reservationSchema";

import { fetchSchedules } from "../features/schedules/scheduleApi";
import { fetchPassengers } from "../features/passengers/passengerApi";
import { createReservationRequest } from "../features/reservations/reservationApi";

function CreateReservationForm() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const [submitError, setSubmitError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
  });

  const selectedScheduleId = watch("scheduleId");
  const seatCountValue = watch("seatCount");

  const selectedSchedule = schedules.find(
    (schedule) => String(schedule.id) === selectedScheduleId
  );

  const seatCount = Number(seatCountValue);

  const totalPrice =
    selectedSchedule && seatCount > 0 ? selectedSchedule.price * seatCount : 0;

  useEffect(() => {
    async function loadReservationData() {
      try {
        setSubmitError("");

        const [schedulesData, passengersData] = await Promise.all([
          fetchSchedules(),
          fetchPassengers(),
        ]);

        setSchedules(schedulesData);
        setPassengers(passengersData);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong while loading reservation data.";

        setSubmitError(message);
        toast.error(message);
        console.error("Error loading reservation data:", error);
      } finally {
        setLoadingData(false);
      }
    }

    loadReservationData();
  }, []);

  const onSubmit = async (data: ReservationFormData) => {
    try {
      setSubmitError("");

      const createdReservation = await createReservationRequest(data);

      console.log("Reservation created:", createdReservation);
      toast.success("Reservation created successfully");
      reset();
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong while creating the reservation.";

      setSubmitError(message);
      toast.error(message);
      console.error("Error creating reservation:", error);
    }
  };

  if (loadingData) {
    return <p className="p-6">Loading reservation data...</p>;
  }

  return (
    <div className="w-full">
      <form
        className="Form"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        autoComplete="off"
      >
        <ReservationFormFields
          control={control}
          register={register}
          errors={errors}
          schedules={schedules}
          passengers={passengers}
        />

        {selectedSchedule && (
          <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
            <h3 className="font-semibold mb-2">Reservation Summary</h3>

            <p>Train: {selectedSchedule.trainName}</p>

            <p>
              Route: {selectedSchedule.departure} → {selectedSchedule.arrival}
            </p>

            <p>Price per seat: {selectedSchedule.price} SAR</p>

            <p>Seat count: {seatCount > 0 ? seatCount : 0}</p>

            <p className="font-semibold">Total price: {totalPrice} SAR</p>
          </div>
        )}

        {submitError && (
          <p className="text-sm font-medium text-red-600">{submitError}</p>
        )}

        <button className="cursor-pointer font-semibold" type="submit">
          Create Reservation
        </button>
      </form>
    </div>
  );
}

export default CreateReservationForm;