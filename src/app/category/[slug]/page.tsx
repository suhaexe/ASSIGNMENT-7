"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryProducts from "@/components/CategoryProducts";
import CardSkeleton from "@/components/CardSkeleton";
import { getCategory, getProductsByCategory } from "@/lib/api";
import type { Category, Product } from "@/types/api";
import { toBn } from "@/lib/bn";

const CategoryPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    Promise.all([getCategory(slug), getProductsByCategory(slug)]).then(
      ([cat, prods]) => {
        if (!cat) setNotFound(true);
        setCategory(cat);
        setProducts(prods);
        setLoading(false);
      },
    );
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white border border-slate-200 rounded-xl p-5 mb-6 animate-pulse">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-slate-100" />
              <div className="space-y-2">
                <div className="h-5 w-32 bg-slate-100 rounded" />
                <div className="h-3 w-48 bg-slate-100 rounded" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (notFound || !category) {
    return (
      <>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 py-8">
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <p className="text-5xl mb-4">🔍</p>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              এই ক্যাটাগরি খুঁজে পাওয়া যায়নি
            </h2>
            <p className="text-slate-500 mb-6">শীঘ্রই পণ্য যোগ করা হবে।</p>
            <Link
              href="/"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center text-2xl">
            {category.icon}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">
              {category.nameBn}
            </h1>
            <p className="text-sm text-slate-500">
              {toBn(products.length)}টি পাণ্যর আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <p className="text-5xl mb-4">🔍</p>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              এই ক্যাটাগরিতে এখন কোনো পণ্য নেই
            </h2>
            <p className="text-slate-500 mb-6">শীঘ্রই পণ্য যোগ করা হবে।</p>
            <Link
              href="/"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        ) : (
          <CategoryProducts products={products} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default CategoryPage;
