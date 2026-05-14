import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearAuthSession } from "../../features/auth/authStorage";
import LogoutConfirmModal from "./LogoutConfrimModal";

interface LogoutButtonProps {
  variant?: "header" | "sidebar";
}

function LogoutButton({ variant = "header" }: LogoutButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    clearAuthSession();
    toast.success("Logged out successfully");
    navigate("/login");
  }

  return (
    <>
      {variant === "sidebar" ? (
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="navItem w-full text-left text-red-300 hover:bg-red-900/30 hover:text-red-100 cursor-pointer"
        >
          <i className="fa-solid fa-right-from-bracket mr-2"></i>
          Logout
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-red-100 hover:bg-white/15 hover:text-white transition cursor-pointer"
        >
          <i className="fa-solid fa-right-from-bracket"></i>
          Logout
        </button>
      )}

      {isModalOpen && (
        <LogoutConfirmModal
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleLogout}
        />
      )}
    </>
  );
}

export default LogoutButton;