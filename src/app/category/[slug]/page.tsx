import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CategoryProducts from "@/components/CategoryProducts";
import { getCategory, getProductsByCategory } from "@/lib/api";
import { toBn } from "@/lib/bn";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  const category = await getCategory(slug);
  if (!category) notFound();

  const products = await getProductsByCategory(slug);

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
}
