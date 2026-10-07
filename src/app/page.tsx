import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-3xl font-bold">homepage</h1>
        <p className="text-slate-600 mt-2">welcome</p>
      </main>
    </>
  );
}
