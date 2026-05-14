import type { Passenger } from "../../features/passengers/passengerTypes";

interface Props {
  passenger: Passenger;
  onDeactivate: (passenger: Passenger) => void;
  onReactivate: (passenger: Passenger) => void;
}

function PassengerStatusAction({
  passenger,
  onDeactivate,
  onReactivate,
}: Props) {
  const isActive = passenger.status === "ACTIVE";

  return (
    <button
      type="button"
      onClick={() =>
        isActive ? onDeactivate(passenger) : onReactivate(passenger)
      }
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md cursor-pointer transition ${
        isActive
          ? "text-orange-600 hover:bg-orange-50 hover:text-orange-800"
          : "text-green-600 hover:bg-green-50 hover:text-green-800"
      }`}
      aria-label={
        isActive
          ? `Deactivate ${passenger.fullName}`
          : `Reactivate ${passenger.fullName}`
      }
      title={isActive ? "Deactivate passenger" : "Reactivate passenger"}
    >
      <i
        className={
          isActive
            ? "fa-solid fa-user-slash"
            : "fa-solid fa-user-check"
        }
      ></i>
    </button>
  );
}

export default PassengerStatusAction;