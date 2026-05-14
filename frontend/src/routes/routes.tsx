import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ScheduleForm from "../pages/ScheduleForm";
import DashBoard from "../pages/DashBoard";
import ManageSchedules from "../pages/ManageSchedules";
import PassengerRegistrationForm from "../pages/PassengerRegistrationForm";
import CreateReservationForm from "../pages/CreateReservationForm";
import ManageReservations from "../pages/ManageReservations";
import ManagePassengers from "../pages/ManagePassengers";
import StaffManagement from "../pages/StaffManagement";
import AdminDashboard from "../pages/AdminDashboard";
import ReportsPage from "../pages/ReportsPage";
import DashboardRedirect from "./DashboardRedirect";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <DashBoard />,
    children: [
      { index: true, element: <DashboardRedirect />,},
      { path: "admin-dashboard", element: <AdminDashboard />,},
      { path: "create-schedule", element: <ScheduleForm /> },
      { path: "manage-schedules", element: <ManageSchedules /> },
      { path: "register-passenger", element: <PassengerRegistrationForm /> },
      { path: "create-reservation", element: <CreateReservationForm /> },
      { path: "manage-reservations", element: <ManageReservations /> },
      { path: "manage-passengers", element: <ManagePassengers /> },
      { path: "staff-management", element: <StaffManagement />},
      { path: "reports", element: <ReportsPage />},
    ],
  },
]);

export default router;