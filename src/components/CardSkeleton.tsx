const CardSkeleton = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-100" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 bg-slate-100 rounded w-2/3" />
          <div className="h-3 bg-slate-100 rounded w-1/3" />
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div className="space-y-2">
          <div className="h-2.5 bg-slate-100 rounded w-16" />
          <div className="h-5 bg-slate-100 rounded w-24" />
        </div>
        <div className="h-6 w-14 bg-slate-100 rounded-md" />
      </div>
    </div>
  );
};

export default CardSkeleton;
