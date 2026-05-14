interface Props {
  title: string;
  value: string | number;
  icon: string;
  note?: string;
}

function SummaryCard({ title, value, icon, note }: Props) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-500">{title}</p>

        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600">
          <i className={icon}></i>
        </div>
      </div>

      <p className="mt-3 text-3xl font-bold text-gray-900">{value}</p>

      {note && <p className="mt-1 text-xs text-gray-400">{note}</p>}
    </div>
  );
}

export default SummaryCard;