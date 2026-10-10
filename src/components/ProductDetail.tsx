"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ChevronRight } from "lucide-react";
import { useSession } from "@/lib/auth-client";
import type { Product } from "@/types/api";
import { toBn, bnMoney, unitBn, marketStats } from "@/lib/bn";

const ProductDetail = ({ product }: { product: Product }) => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("বিস্তারিত দাম দেখতে সাইন ইন করুন");
      router.push("/signin");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-slate-100 rounded w-48" />
          <div className="h-32 bg-slate-100 rounded-2xl" />
          <div className="h-40 bg-slate-100 rounded-2xl" />
        </div>
      </main>
    );
  }

  if (!session) return null;

  const up = product.change.dir === "up";
  const down = product.change.dir === "down";
  const arrow = up ? "▲" : down ? "▼" : "—";
  const badgeColor = up
    ? "text-red-600 bg-red-50 border-red-100"
    : down
      ? "text-green-600 bg-green-50 border-green-100"
      : "text-slate-500 bg-slate-50 border-slate-100";

  const { min, max, avg } = marketStats(product);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-4">
        <Link href="/" className="hover:text-green-700">
          হোম
        </Link>
        <ChevronRight size={12} />
        <Link
          href={`/category/${product.category}`}
          className="hover:text-green-700"
        >
          {product.categoryNameBn}
        </Link>
        <ChevronRight size={12} />
        <span className="text-slate-700">{product.nameBn}</span>
      </nav>

      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="w-14 h-14 rounded-xl bg-slate-100 flex items-center justify-center text-3xl shrink-0">
              {product.image}
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 truncate">
                {product.nameBn}
              </h1>
              <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                <span className="text-xs bg-green-50 text-green-700 border border-green-100 px-2 py-0.5 rounded">
                  {product.categoryNameBn}
                </span>
                <span className="text-xs text-slate-500">
                  {unitBn(product.unit)}
                </span>
              </div>
            </div>
          </div>

          <div className="text-right shrink-0">
            <p className="text-[11px] text-slate-500">আজকের দাম</p>
            <p className="text-xl sm:text-2xl font-bold text-slate-900">
              {bnMoney(product.today)} টাকা
            </p>
            <span
              className={`inline-block mt-1 text-xs font-medium px-2 py-0.5 rounded-md border ${badgeColor}`}
            >
              {arrow} {toBn(Math.abs(product.change.pct).toFixed(1))}%
            </span>
          </div>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="text-base font-semibold text-slate-800 mb-3">
          দামের সামগ্রিক চিত্র
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-xs text-slate-500">সর্বনিম্ন দাম</p>
            <p className="text-lg font-bold text-slate-900 mt-1">
              {bnMoney(min)} টাকা
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              সবচেয়ে সস্তা বাজারে
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-xs text-slate-500">সর্বোচ্চ দাম</p>
            <p className="text-lg font-bold text-slate-900 mt-1">
              {bnMoney(max)} টাকা
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              সবচেয়ে দামি বাজারে
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-xs text-slate-500">গড় দাম</p>
            <p className="text-lg font-bold text-slate-900 mt-1">
              {bnMoney(avg)} টাকা
            </p>
            <p className="text-[11px] text-slate-400 mt-1">সব বাজারের গড়</p>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-base font-semibold text-slate-800 mb-3">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
          <table className="w-full text-xs sm:text-sm table-fixed">
            <thead>
              <tr className="bg-slate-50 text-slate-600">
                <th className="text-left font-medium px-2 sm:px-4 py-3 w-[34%]">
                  বাজার
                </th>
                <th className="hidden sm:table-cell text-left font-medium px-4 py-3">
                  অবস্থান
                </th>
                <th className="text-right font-medium px-2 sm:px-4 py-3">
                  সর্বনিম্ন
                </th>
                <th className="text-right font-medium px-2 sm:px-4 py-3">
                  সর্বোচ্চ
                </th>
                <th className="text-right font-medium px-2 sm:px-4 py-3">
                  গড়
                </th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m, i) => {
                const rowAvg = Math.round((m.min + m.max) / 2);
                return (
                  <tr
                    key={i}
                    className="border-t border-slate-100 hover:bg-slate-50/60"
                  >
                    <td className="px-2 sm:px-4 py-3 text-slate-800 break-words">
                      {m.market}
                    </td>
                    <td className="hidden sm:table-cell px-4 py-3 text-slate-500">
                      {m.division}
                    </td>
                    <td className="px-2 sm:px-4 py-3 text-right text-slate-700 whitespace-nowrap">
                      {bnMoney(m.min)}
                    </td>
                    <td className="px-2 sm:px-4 py-3 text-right text-slate-700 whitespace-nowrap">
                      {bnMoney(m.max)}
                    </td>
                    <td className="px-2 sm:px-4 py-3 text-right font-medium text-slate-900 whitespace-nowrap">
                      {bnMoney(rowAvg)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default ProductDetail;
