"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { getProduct } from "@/lib/api";
import type { Product } from "@/types/api";
import Link from "next/link";

const ProductPage = () => {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct(id).then((p) => {
      setProduct(p);
      setLoading(false);
    });
  }, [id]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-slate-100 rounded w-48" />
            <div className="h-32 bg-slate-100 rounded-2xl" />
            <div className="h-40 bg-slate-100 rounded-2xl" />
          </div>
        </main>
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <p className="text-5xl mb-4">🔍</p>
            <h2 className="text-xl font-bold text-slate-800 mb-2">
              পণ্যটি খুঁজে পাওয়া যায়নি
            </h2>
            <p className="text-slate-500 mb-6">
              আপনি যে পণ্যটি খুঁজছেন সেটি নেই।
            </p>
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
      <ProductDetail product={product} />
      <Footer />
    </>
  );
};

export default ProductPage;
