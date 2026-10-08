import type { Product, Category } from "@/types/api";

const BASE = process.env.NEXT_PUBLIC_API_URL;

async function safeFetch<T>(path: string, fallback: T): Promise<T> {
  const url = `${BASE}${path}`;
  console.log("[api]", url);

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });
    console.log("[api]", res.status, res.statusText);

    if (!res.ok) {
      const body = await res.text();
      console.log("[api] body:", body.slice(0, 300));
      return fallback;
    }
    return res.json();
  } catch (err) {
    console.log("[api] error:", err);
    return fallback;
  }
}

export const getProducts = () => safeFetch<Product[]>("/products", []);

export const getProduct = (slug: string) =>
  safeFetch<Product | null>(`/products/${slug}`, null);

export const getCategories = () => safeFetch<Category[]>("/categories", []);

export const getProductsByCategory = (slug: string) =>
  safeFetch<Product[]>(`/products?category=${slug}`, []);

export const getCategory = (slug: string) =>
  safeFetch<Category | null>(`/categories/${slug}`, null);

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
      product.markets.length
  );
  return { min, max, avg };
}