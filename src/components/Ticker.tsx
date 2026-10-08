"use client";

import type { Product } from "@/types/api";
import { toBn } from "@/lib/bn";
import { unitBn } from "@/lib/api";

type Props = { products: Product[] };

const Ticker = ({ products }: Props) => {
  const items = [...products, ...products];

  return (
    <div className="border-y border-slate-200 bg-white overflow-hidden">
      <div className="flex w-max animate-marquee py-2">
        {items.map((p, i) => {
          const up = p.change.dir === "up";
          const down = p.change.dir === "down";
          const arrow = up ? "▲" : down ? "▼" : "—";
          const color = up
            ? "text-red-600"
            : down
              ? "text-green-600"
              : "text-slate-400";
          const shortUnit = unitBn(p.unit).replace("প্রতি ", "/");

          return (
            <div
              key={`${p.id}-${i}`}
              className="flex items-center gap-1.5 px-4 text-sm whitespace-nowrap border-r border-slate-200"
            >
              <span>{p.image}</span>
              <span className="text-slate-700">{p.nameBn}</span>
              <span className="text-slate-400">
                {toBn(p.today)} টাকা{shortUnit}
              </span>
              <span className={`${color} font-medium`}>
                {arrow} {toBn(Math.abs(p.change.pct).toFixed(1))}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Ticker;
