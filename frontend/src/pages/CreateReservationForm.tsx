import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import ReservationFormFields from "../components/reservations/ReservationFormFields";
import type { Schedule } from "../features/schedules/scheduleTypes";
import {
  reservationSchema,
  type ReservationFormData,
} from "../features/reservations/reservationSchema";
import { fetchSchedules } from "../features/schedules/scheduleApi";
import { createReservationRequest } from "../features/reservations/reservationApi";

function CreateReservationForm() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loadingSchedules, setLoadingSchedules] = useState(true);
  /*For backend errors*/
  const [submitError, setSubmitError] = useState("");

  /*For frontend(zod) errors*/
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
  const totalPrice = selectedSchedule && seatCount > 0
      ? selectedSchedule.price * seatCount
      : 0;

  useEffect(() => {
    async function loadSchedules() {
      try {
        setSubmitError("");

        const data = await fetchSchedules();
        setSchedules(data);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Something went wrong while loading schedules.";

        setSubmitError(message);
        console.error("Error loading schedules:", error);
      } finally {
        setLoadingSchedules(false);
      }
    }

    loadSchedules();
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

  if (loadingSchedules) {
    return <p className="p-6">Loading schedules...</p>;
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
        />
      {selectedSchedule && (
        <div className="rounded-md border border-gray-200 bg-white p-4 shadow-sm">
          <h3 className="font-semibold mb-2">Reservation Summary</h3>

          <p>
            Train: {selectedSchedule.trainName}
          </p>

          <p>
            Route: {selectedSchedule.departure} → {selectedSchedule.arrival}
          </p>

          <p>
            Price per seat: {selectedSchedule.price} SAR
          </p>

          <p>
            Seat count: {seatCount > 0 ? seatCount : 0}
          </p>

          <p className="font-semibold">
            Total price: {totalPrice} SAR
          </p>
        </div>
      )}
        {submitError && (
          <p className="text-sm font-medium text-red-600">
            {submitError}
          </p>
        )}

        <button className="cursor-pointer font-semibold" type="submit">
          Create Reservation
        </button>
      </form>
    </div>
  );
}

export default CreateReservationForm;