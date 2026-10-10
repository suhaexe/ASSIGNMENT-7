import Navbar from "@/components/Navbar";

const Loading = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-100 rounded w-48" />
          <div className="h-32 bg-slate-100 rounded-2xl" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="h-24 bg-slate-100 rounded-xl" />
            <div className="h-24 bg-slate-100 rounded-xl" />
            <div className="h-24 bg-slate-100 rounded-xl" />
          </div>
          <div className="h-64 bg-slate-100 rounded-2xl" />
        </div>
      </main>
    </>
  );
};

export default Loading;