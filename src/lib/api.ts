import type { Product, Category } from "@/types/api";

const BASE = process.env.NEXT_PUBLIC_API_URL;

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE}/products`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load products");
  return res.json();
}

export async function getProduct(slug: string): Promise<Product | null> {
  const res = await fetch(`${BASE}/products/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE}/categories`, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to load categories");
  return res.json();
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const res = await fetch(`${BASE}/products?category=${slug}`, {
    cache: "no-store",
  });
  if (!res.ok) return [];
  return res.json();
}

export async function getCategory(slug: string): Promise<Category | null> {
  const res = await fetch(`${BASE}/categories/${slug}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
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
  const mins = product.markets.map((m) => m.min);
  const maxs = product.markets.map((m) => m.max);
  const min = Math.min(...mins);
  const max = Math.max(...maxs);

  const avg = Math.round(
    product.markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) /
      product.markets.length,
  );
  return { min, max, avg };
}
