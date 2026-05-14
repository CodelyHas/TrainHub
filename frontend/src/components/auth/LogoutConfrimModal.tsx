interface LogoutConfirmModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

function LogoutConfirmModal({ onClose, onConfirm }: LogoutConfirmModalProps) {
  return (
    <div className="modalContainer">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
            <i className="fa-solid fa-right-from-bracket"></i>
          </div>

          <h2 className="text-xl font-bold text-gray-900">Log Out</h2>
        </div>

        <p className="text-gray-700">
          Are you sure you want to log out of your account?
        </p>

        <p className="text-sm font-semibold text-gray-500 mt-2">
          You will need to log in again to access the dashboard.
        </p>

        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default LogoutConfirmModal;