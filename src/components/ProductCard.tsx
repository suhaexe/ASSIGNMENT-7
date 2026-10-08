import Link from "next/link";
import type { Product } from "@/types/api";
import { toBn, bnMoney, unitBn } from "@/lib/bn";

type Props = { product: Product };

const ProductCard = ({ product }: Props) => {
  const up = product.change.dir === "up";
  const down = product.change.dir === "down";
  const arrow = up ? "▲" : down ? "▼" : "—";
  const badgeColor = up
    ? "text-red-600 bg-red-50 border-red-100"
    : down
      ? "text-green-600 bg-green-50 border-green-100"
      : "text-slate-500 bg-slate-50 border-slate-100";

  return (
    <Link
      href={`/product/${product.slug}`}
      className="block bg-white border border-slate-200 rounded-xl p-4 hover:border-green-300 hover:shadow-sm transition"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center text-xl">
          {product.image}
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-800 truncate">
            {product.nameBn}
          </h3>
          <p className="text-xs text-slate-500">{unitBn(product.unit)}</p>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-[11px] text-slate-500">আজকের দাম</p>
          <p className="text-lg font-bold text-slate-900">
            {bnMoney(product.today)} টাকা
          </p>
        </div>

        <span
          className={`text-xs font-medium px-2 py-1 rounded-md border ${badgeColor}`}
        >
          {arrow} {toBn(Math.abs(product.change.pct).toFixed(1))}%
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
