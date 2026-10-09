"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Product } from "@/types/api";
import { toBn } from "@/lib/bn";
import ProductCard from "./ProductCard";

type SortOption = "default" | "price-asc" | "price-desc";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "price-asc", label: "দাম: কম থেকে বেশি" },
  { value: "price-desc", label: "দাম: বেশি থেকে কম" },
];

const CategoryProducts = ({ products }: { products: Product[] }) => {
  const [sort, setSort] = useState<SortOption>("default");

  const sorted = [...products];
  if (sort === "price-asc") sorted.sort((a, b) => a.today - b.today);
  else if (sort === "price-desc") sorted.sort((a, b) => b.today - a.today);

  return (
    <>
      <div className="md:hidden flex flex-wrap items-center justify-between gap-2 mb-4">
        <p className="text-xs text-slate-500">
          মোট {toBn(sorted.length)} টি পণ্য দেখানো হচ্ছে
        </p>

        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs text-slate-500">সাজান</span>
          <div className="relative">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="appearance-none bg-white border border-slate-200 rounded-full pl-3 pr-8 py-1.5 text-xs text-slate-700 cursor-pointer hover:border-slate-300 focus:outline-none focus:border-slate-300"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={12}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <div className="hidden md:block">
        <div className="bg-white border border-slate-200 rounded-xl px-5 py-3 flex items-center justify-end mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">সাজান</span>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="appearance-none w-44 bg-white border border-slate-200 rounded-lg pl-3 pr-9 py-2 text-sm text-slate-700 cursor-pointer hover:border-slate-300 focus:outline-none focus:border-slate-300"
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-4">
          মোট {toBn(sorted.length)} টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
};

export default CategoryProducts;
