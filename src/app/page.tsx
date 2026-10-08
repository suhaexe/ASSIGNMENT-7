import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SectionHeading from "@/components/SectionHeading";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  return (
    <>
      <Navbar />
      <Ticker products={products} />
      <Hero />

      <main className="max-w-6xl mx-auto px-4 pb-12">
        <section className="mt-10">
          <SectionHeading
            title="আজ দাম বেড়েছে ▲"
            subtitle="যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে"
            accent="red"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {risers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        <section className="mt-12">
          <SectionHeading
            title="আজ দাম কমেছে ▼"
            subtitle="যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে"
            accent="green"
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
            subtitle="সব ক্যাটাগরির আজকের বাজার দর"
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
}
