import type { Product } from "@/types/api";

const BN_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBn(input: string | number): string {
  const str = typeof input === "number" ? input.toString() : input;
  return str.replace(/[0-9]/g, (digit) => BN_DIGITS[Number(digit)]);
}

export function bnMoney(value: number): string {
  const formatted = value.toLocaleString("en-IN");
  return toBn(formatted);
}

export function bnPercent(value: number): string {
  const abs = Math.abs(value).toFixed(1);
  return `${toBn(abs)}%`;
}

export function bnPrice(value: number): string {
  return `${bnMoney(value)} টাকা`;
}

export function unitBn(unit: string): string {
  const map: Record<string, string> = {
    kg: "প্রতি কেজি",
    litre: "প্রতি লিটার",
    dozen: "প্রতি ডজন",
    piece: "প্রতি পিস",
  };
  return map[unit] ?? `প্রতি ${unit}`;
}

export function marketStats(product: Product) {
  if (product.markets.length === 0) {
    return { min: product.today, max: product.today, avg: product.today };
  }
  const min = Math.min(...product.markets.map((m) => m.min));
  const max = Math.max(...product.markets.map((m) => m.max));
  const avg = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      product.markets.length,
  );
  return { min, max, avg };
}
