import Navbar from "@/components/Navbar";
import CardSkeleton from "@/components/CardSkeleton";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-4 animate-pulse">
            <div className="w-12 h-12 rounded-lg bg-slate-100" />
            <div className="space-y-2">
              <div className="h-5 w-32 bg-slate-100 rounded" />
              <div className="h-3 w-48 bg-slate-100 rounded" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </main>
    </>
  );
}
