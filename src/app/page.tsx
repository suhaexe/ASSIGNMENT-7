"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import CardSkeleton from "@/components/CardSkeleton";
import { getProducts } from "@/lib/api";
import { toBn } from "@/lib/bn";
import type { Product } from "@/types/api";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="max-w-6xl mx-auto px-4 pb-12 pt-10">
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

  return (
    <>
      <Navbar />
      <Ticker products={products} />
      <Hero />

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <section className="mt-10">
          <SectionHeading
            title="আজ দাম বেড়েছে"
            arrow="up"
            subtitle="যেসব পণ্যের দাম আজ বেড়েছে"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {risers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeading
            title="আজ দাম কমেছে"
            arrow="down"
            subtitle="যেসব পণ্যের দাম আজ কমেছে"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fallers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section id="সব-পণ্য" className="mt-12 scroll-mt-28">
          <SectionHeading
            title="সব পণ্য"
            subtitle={`মোট ${toBn(products.length)}টি পণ্য দেখানো হচ্ছে`}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};

export default Home;
