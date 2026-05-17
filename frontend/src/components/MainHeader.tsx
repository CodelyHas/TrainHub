import { Link, useNavigate } from "react-router-dom";
import { clearAuthSession } from "../features/auth/authStorage";

function MainHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuthSession();
    navigate("/login");
  };

  return (
    <header
      className="
        bg-linear-to-r from-blue-600 via-cyan-500 to-purple-600
        text-white flex items-center justify-between
        px-4 py-3 sm:px-8 sm:py-4 shadow-md
      "
    >
      <Link
        to="/dashboard"
        className="flex items-center gap-2 font-bold text-3xl sm:text-4xl"
      >
        <span>TrainHub</span>
        <i className="fa-solid fa-train text-3xl sm:text-4xl"></i>
      </Link>

      <nav className="flex items-center gap-4 sm:gap-8 text-sm sm:text-base font-bold">
        <Link
          to="/dashboard"
          className="hover:underline underline-offset-4"
        >
          Dashboard
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 hover:underline underline-offset-4 cursor-pointer"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          <span>Logout</span>
        </button>
      </nav>
    </header>
  );
}

export default MainHeader;