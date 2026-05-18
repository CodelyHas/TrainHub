import type { Schedule } from "../../features/schedules/scheduleTypes";

interface Props {
  schedules: Schedule[];
  isAdminUser: boolean;
  onEdit: (schedule: Schedule) => void;
  onDelete: (schedule: Schedule) => void;
}

function ScheduleTable({
  schedules,
  isAdminUser,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm">
      <div className="max-h-125 overflow-auto">
        <table className="min-w-325 w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0 z-10 shadow-sm">
            <tr className="tableHeaders">
              <th>Train</th>
              <th>From</th>
              <th>To</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Economy Price</th>
              <th>Business Price</th>
              <th>Economy Seats</th>
              <th>Business Seats</th>
              <th>Total Capacity</th>
              <th>Available Seats</th>
              {isAdminUser && <th className="min-w-28">Actions</th>}
            </tr>
          </thead>

          <tbody>
            {schedules.map((schedule) => {
              const totalCapacity =
                schedule.economyCapacity + schedule.businessCapacity;

              const totalAvailableSeats =
                schedule.economyAvailableSeats +
                schedule.businessAvailableSeats;

              return (
                <tr
                  key={schedule.id}
                  className="tableCells text-center odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td>{schedule.trainName}</td>
                  <td>{schedule.departure}</td>
                  <td>{schedule.arrival}</td>
                  <td>{new Date(schedule.departureTime).toLocaleString()}</td>
                  <td>{new Date(schedule.arrivalTime).toLocaleString()}</td>
                  <td>{schedule.economyPrice}</td>
                  <td>{schedule.businessPrice}</td>
                  <td>
                    {schedule.economyAvailableSeats}/
                    {schedule.economyCapacity}
                  </td>
                  <td>
                    {schedule.businessAvailableSeats}/
                    {schedule.businessCapacity}
                  </td>
                  <td>{totalCapacity}</td>
                  <td>{totalAvailableSeats}</td>

                  {isAdminUser && (
                    <td>
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={() => onEdit(schedule)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-blue-600 hover:bg-blue-50 hover:text-blue-800 cursor-pointer transition"
                          aria-label={`Edit ${schedule.trainName}`}
                          title="Edit schedule"
                        >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>

                        <button
                          type="button"
                          onClick={() => onDelete(schedule)}
                          className="inline-flex h-8 w-8 items-center justify-center rounded-md text-red-600 hover:bg-red-50 hover:text-red-800 cursor-pointer transition"
                          aria-label={`Delete ${schedule.trainName}`}
                          title="Delete schedule"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ScheduleTable;