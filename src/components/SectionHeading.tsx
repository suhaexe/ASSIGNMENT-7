type Props = {
  title: string;
  subtitle?: string;
  accent?: "red" | "green" | "slate";
};

const SectionHeading = ({ title, subtitle, accent = "slate" }: Props) => {
  const barColor =
    accent === "red"
      ? "bg-red-500"
      : accent === "green"
        ? "bg-green-500"
        : "bg-slate-400";

  return (
    <div className="flex items-center gap-3 mb-4">
      <span className={`w-1 h-6 rounded ${barColor}`} />
      <div>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        {subtitle && (
          <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default SectionHeading;
