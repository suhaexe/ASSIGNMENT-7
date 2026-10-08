import Navbar from "@/components/Navbar";
import Ticker from "@/components/Ticker";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { getProducts } from "@/lib/api";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <Ticker products={products} />
      <Hero />
      <Footer />
    </>
  );
}
