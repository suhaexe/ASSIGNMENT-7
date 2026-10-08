import { getBnDate } from "@/lib/utils";

const Hero = () => {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-8 pb-4">
      <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-10 flex flex-col-reverse md:flex-row items-center gap-6">
        <div className="flex-1 text-center md:text-left">
          <span className="inline-block text-xs font-medium text-green-700 bg-green-50 border border-green-100 px-3 py-1 rounded-full">
            {getBnDate()}
          </span>

          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl mx-auto md:mx-0">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <a
            href="#সব-পণ্য"
            className="inline-block mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-sm transition"
          >
            সব দাম দেখুন
          </a>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <img
            src="/bazar-hero.png"
            alt="Hero Image"
            className="w-48 sm:w-60 md:w-72 h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
