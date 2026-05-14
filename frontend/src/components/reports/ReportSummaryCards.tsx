import SummaryCard from "../dashboard/SummaryCard";
import type { ReportSummary } from "../../features/reports/reportTypes";

interface Props {
  summary?: ReportSummary;
}

function ReportSummaryCards({ summary }: Props) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      <SummaryCard
        title="Total Bookings"
        value={summary?.totalBookings || 0}
        icon="fa-solid fa-ticket"
        note="Bookings in selected period"
      />

      <SummaryCard
        title="Confirmed Bookings"
        value={summary?.confirmedBookings || 0}
        icon="fa-solid fa-circle-check"
        note="Confirmed reservations"
      />

      <SummaryCard
        title="Cancelled Bookings"
        value={summary?.cancelledBookings || 0}
        icon="fa-solid fa-ban"
        note="Cancelled reservations"
      />

      <SummaryCard
        title="Revenue"
        value={`${summary?.totalRevenue || 0} SAR`}
        icon="fa-solid fa-coins"
        note="Confirmed booking revenue"
      />
    </div>
  );
}

export default ReportSummaryCards;