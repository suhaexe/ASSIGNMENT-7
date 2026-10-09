import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-6xl mb-4">🔍</p>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          পেজটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-slate-500 mb-6">
          আপনি যে পেজটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।
        </p>
        <Link
          href="/"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
}
