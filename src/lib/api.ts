import type { Product, Category } from "@/types/api";

const BASE = process.env.NEXT_PUBLIC_API_URL;

async function safeFetch<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${BASE}${path}`, { next: { revalidate: 60 } });
    if (!res.ok) return fallback;
    return res.json();
  } catch {
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