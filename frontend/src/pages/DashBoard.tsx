import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import MainHeader from "../components/MainHeader";
import { isAdmin } from "../features/auth/authStorage";

function Dashboard() {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const navItem = ({ isActive }: { isActive: boolean }) =>
    `sidebarLink ${
      isActive
        ? "bg-blue-600 text-white font-bold shadow-md"
        : "text-gray-300 font-semibold hover:bg-white/10 hover:text-white"
    }`;

  const admin = isAdmin();

  return (
    <div className="h-screen flex flex-col">
      <MainHeader />
      <div className="md:hidden bg-[#f3f4f6] px-4 py-3 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setMobileSidebarOpen(true)}
          className="inline-flex items-center gap-2 rounded-lg bg-[#111827] px-4 py-2 text-sm font-semibold text-white shadow"
        >
          <i className="fa-solid fa-bars"></i>
          Menu
        </button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        {isMobileSidebarOpen && (
          <button
            type="button"
            aria-label="Close sidebar"
            onClick={() => setMobileSidebarOpen(false)}
            className="fixed inset-0 z-60 bg-black/50 md:hidden"
          />
        )}
        <aside
          className={`
            fixed md:static inset-y-0 left-0 z-70 w-72 shrink-0
            bg-[#111827] text-gray-300 border-r border-gray-800 overflow-y-auto
            transform transition-transform duration-300
            ${isMobileSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 md:block md:w-60 xl:w-72
          `}
        >
          <div className="flex items-center justify-between px-4 py-4 md:hidden">
            <span className="font-bold text-white">Menu</span>

            <button
              type="button"
              onClick={() => setMobileSidebarOpen(false)}
              className="text-gray-300 hover:text-white"
            >
              <i className="fa-solid fa-xmark text-xl"></i>
            </button>
          </div>
            <nav
              className="flex flex-col gap-1 px-4 py-5"
              onClick={() => setMobileSidebarOpen(false)}
            >
            {admin && (
              <>
                <p className="sidebarTitle">Overview</p>

                <NavLink to="/dashboard/admin-dashboard" className={navItem}>
                  <i className="fa-solid fa-chart-line sidebarIcon"></i>
                  <span>Admin Dashboard</span>
                </NavLink>

                <NavLink to="/dashboard/reports" className={navItem}>
                  <i className="fa-solid fa-file-lines sidebarIcon"></i>
                  <span>Reports</span>
                </NavLink>
              </>
            )}

            <p className="sidebarTitle">Schedule Management</p>

            <NavLink to="/dashboard/manage-schedules" className={navItem}>
              <i className="fa-solid fa-calendar-days sidebarIcon"></i>
              <span>Manage Schedules</span>
            </NavLink>

            {admin && (
              <NavLink to="/dashboard/create-schedule" className={navItem}>
                <i className="fa-solid fa-circle-plus sidebarIcon"></i>
                <span>Create Schedule</span>
              </NavLink>
            )}

            <p className="sidebarTitle">Passenger Management</p>

            <NavLink to="/dashboard/manage-passengers" className={navItem}>
              <i className="fa-solid fa-users sidebarIcon"></i>
              <span>Manage Passengers</span>
            </NavLink>

            <NavLink to="/dashboard/register-passenger" className={navItem}>
              <i className="fa-solid fa-user-plus sidebarIcon"></i>
              <span>Register Passenger</span>
            </NavLink>

            <p className="sidebarTitle">Reservation Management</p>

            <NavLink to="/dashboard/manage-reservations" className={navItem}>
              <i className="fa-solid fa-ticket sidebarIcon"></i>
              <span>Manage Reservations</span>
            </NavLink>

            <NavLink to="/dashboard/create-reservation" className={navItem}>
              <i className="fa-solid fa-clipboard-check sidebarIcon"></i>
              <span>Create Reservation</span>
            </NavLink>

            {admin && (
              <>
                <p className="sidebarTitle">Administration</p>

                <NavLink to="/dashboard/staff-management" className={navItem}>
                  <i className="fa-solid fa-user-shield sidebarIcon"></i>
                  <span>Staff Management</span>
                </NavLink>
              </>
            )}
          </nav>
        </aside>

      <main className="min-w-0 flex-1 overflow-auto bg-[#f3f4f6]">
        <Outlet />
      </main>
      </div>
    </div>
  );
}

export default Dashboard;