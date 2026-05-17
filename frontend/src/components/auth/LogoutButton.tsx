import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { clearAuthSession } from "../../features/auth/authStorage";
import LogoutConfirmModal from "./LogoutConfrimModal";

function LogoutButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    clearAuthSession();
    toast.success("Logged out successfully");
    navigate("/login");
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-red-100 hover:bg-white/15 hover:text-white transition cursor-pointer"
      >
        <i className="fa-solid fa-right-from-bracket"></i>
        Logout
      </button>

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