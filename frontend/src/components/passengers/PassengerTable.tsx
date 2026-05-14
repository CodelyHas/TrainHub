import type { Passenger } from "../../features/passengers/passengerTypes";
import PassengerStatusAction from "./PassengerStatusAction";

interface Props {
  passengers: Passenger[];
  onEdit: (passenger: Passenger) => void;
  onDeactivate: (passenger: Passenger) => void;
  onReactivate: (passenger: Passenger) => void;
}

function PassengerTable({
  passengers,
  onEdit,
  onDeactivate,
  onReactivate,
}: Props) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm">
      <div className="max-h-125 overflow-auto">
        <table className="min-w-220 w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0 z-10 shadow-sm">
            <tr className="tableHeaders">
              <th>Full Name</th>
              <th>National ID</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Status</th>
              <th className="min-w-28">Actions</th>
            </tr>
          </thead>

          <tbody>
            {passengers.map((passenger) => (
              <tr
                key={passenger.id}
                className="tableCells text-center odd:bg-white even:bg-gray-50 hover:bg-gray-100"
              >
                <td>{passenger.fullName}</td>
                <td>{passenger.nationalId}</td>
                <td>{passenger.phone}</td>
                <td>{passenger.email || "—"}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      passenger.status?.toUpperCase() === "ACTIVE"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {passenger.status || "UNKNOWN"}
                  </span>
                </td>

                <td>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEdit(passenger)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-blue-600 hover:bg-blue-50 hover:text-blue-800 cursor-pointer transition"
                      aria-label={`Edit ${passenger.fullName}`}
                      title="Edit passenger"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>

                    <PassengerStatusAction
                      passenger={passenger}
                      onDeactivate={onDeactivate}
                      onReactivate={onReactivate}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PassengerTable;