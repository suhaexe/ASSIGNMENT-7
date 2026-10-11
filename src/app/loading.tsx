import Navbar from "@/components/Navbar";
import CardSkeleton from "@/components/CardSkeleton";

const Loading = () => {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 pb-12">
        <section className="pt-8 pb-4">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-10 flex flex-col-reverse md:flex-row items-center gap-6 animate-pulse">
            <div className="flex-1 w-full space-y-3">
              <div className="h-6 w-32 bg-slate-100 rounded-full" />
              <div className="h-10 w-3/4 bg-slate-100 rounded" />
              <div className="h-4 w-full bg-slate-100 rounded" />
              <div className="h-4 w-2/3 bg-slate-100 rounded" />
              <div className="h-11 w-32 bg-slate-100 rounded-lg mt-4" />
            </div>
            <div className="w-40 h-40 sm:w-52 sm:h-52 bg-slate-100 rounded-full" />
          </div>
        </section>

        <section className="mt-10">
          <div className="h-7 w-48 bg-slate-100 rounded mb-2" />
          <div className="h-4 w-64 bg-slate-100 rounded mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="h-7 w-48 bg-slate-100 rounded mb-2" />
          <div className="h-4 w-64 bg-slate-100 rounded mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <div className="h-7 w-32 bg-slate-100 rounded mb-2" />
          <div className="h-4 w-56 bg-slate-100 rounded mb-4" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Loading;
