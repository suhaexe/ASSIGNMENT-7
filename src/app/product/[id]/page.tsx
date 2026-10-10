import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductDetail from "@/components/ProductDetail";
import { getProduct } from "@/lib/api";

type Props = {
  params: Promise<{ id: string }>;
};

const ProductPage = async ({ params }: Props) => {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) notFound();

  return (
    <>
      <Navbar />
      <ProductDetail product={product} />
      <Footer />
    </>
  );
};

export default ProductPage;
