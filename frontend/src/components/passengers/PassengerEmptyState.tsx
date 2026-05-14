function PassengerEmptyState() {
  return (
    <div className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-500">
        <i className="fa-solid fa-users"></i>
      </div>

      <h3 className="text-base font-semibold text-gray-800">
        No passengers found
      </h3>

      <p className="mt-1 text-sm text-gray-500">
        Register passengers to manage their profiles and reservation history.
      </p>
    </div>
  );
}

export default PassengerEmptyState;