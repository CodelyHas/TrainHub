import { Link } from "react-router-dom";
import LogoutButton from "./auth/LogoutButton";

function MainHeader() {
  return (
    <header
      className="w-full z-50
      bg-linear-to-r from-blue-600 via-cyan-500 to-purple-600
      text-white flex items-center justify-between px-8 py-4 shadow-md"
    >
      <Link
        to="/dashboard"
        className="flex items-center gap-2 text-3xl font-bold"
      >
        <span>TrainHub</span>
        <i className="fa-solid fa-train"></i>
      </Link>

      <nav className="flex gap-8 text-md font-bold items-center">
        <Link to="/dashboard" className="hover:underline underline-offset-4">
          Dashboard
        </Link>

        <LogoutButton variant="header" />
      </nav>
    </header>
  );
}

export default MainHeader;