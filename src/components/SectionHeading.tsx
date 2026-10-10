type Props = {
  title: string;
  subtitle?: string;
  arrow?: "up" | "down";
};

const SectionHeading = ({ title, subtitle, arrow }: Props) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
        {arrow === "up" && <span className="text-red-600">▲</span>}
        {arrow === "down" && <span className="text-green-600">▼</span>}
        {title}
      </h2>
      {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
    </div>
  );
};

export default SectionHeading;
