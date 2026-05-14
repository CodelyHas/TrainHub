import type { Staff } from "../../features/staff/staffTypes";

interface Props {
  staffList: Staff[];
  onEdit: (staff: Staff) => void;
  onStatusClick: (staff: Staff) => void;
}

function StaffTable({ staffList, onEdit, onStatusClick }: Props) {
  return (
    <div className="bg-white border border-gray-200 shadow-sm">
      <div className="max-h-125 overflow-auto">
        <table className="min-w-220 w-full border-collapse">
          <thead className="bg-gray-200 sticky top-0 z-10 shadow-sm">
            <tr className="tableHeaders">
              <th>Full Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Created At</th>
              <th className="min-w-28">Actions</th>
            </tr>
          </thead>

          <tbody>
            {staffList.map((staff) => (
              <tr
                key={staff.id}
                className="tableCells text-center odd:bg-white even:bg-gray-50 hover:bg-gray-100"
              >
                <td>{staff.fullName}</td>
                <td>{staff.email}</td>

                <td>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      staff.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {staff.isActive ? "ACTIVE" : "INACTIVE"}
                  </span>
                </td>

                <td>{new Date(staff.createdAt).toLocaleDateString()}</td>

                <td>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => onEdit(staff)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-md text-blue-600 hover:bg-blue-50 hover:text-blue-800 cursor-pointer transition"
                      title="Edit staff"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>

                    <button
                      type="button"
                      onClick={() => onStatusClick(staff)}
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-md cursor-pointer transition ${
                        staff.isActive
                          ? "text-orange-600 hover:bg-orange-50 hover:text-orange-800"
                          : "text-green-600 hover:bg-green-50 hover:text-green-800"
                      }`}
                      title={
                        staff.isActive
                          ? "Deactivate staff"
                          : "Reactivate staff"
                      }
                    >
                      <i
                        className={
                          staff.isActive
                            ? "fa-solid fa-user-slash"
                            : "fa-solid fa-user-check"
                        }
                      ></i>
                    </button>
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

export default StaffTable;