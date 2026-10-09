"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";
import { authClient, useSession } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const UpdateForm = ({ initialName }: { initialName: string }) => {
  const router = useRouter();
  const [name, setName] = useState(initialName);
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = name.trim();
    if (!trimmed) {
      toast.error("নাম লিখুন");
      return;
    }
    if (trimmed.length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    setSaving(true);

    await authClient.updateUser(
      { name: trimmed },
      {
        onSuccess: () => {
          toast.success("তথ্য আপডেট হয়েছে");
          router.push("/profile");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "আপডেট ব্যর্থ হয়েছে");
          setSaving(false);
        },
      },
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          নাম
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম"
          className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-500"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition"
      >
        {saving ? "সংরক্ষণ করা হচ্ছে..." : "তথ্য আপডেট করুন"}
      </button>
    </form>
  );
};

const UpdateProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("আপডেট করতে সাইন ইন করুন");
      router.push("/signin");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <>
        <Navbar />
        <main className="max-w-md mx-auto px-4 py-10">
          <div className="animate-pulse space-y-4">
            <div className="h-7 bg-slate-100 rounded w-40" />
            <div className="h-4 bg-slate-100 rounded w-64" />
            <div className="h-40 bg-slate-100 rounded-2xl mt-6" />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!session) return null;

  return (
    <>
      <Navbar />
      <main className="max-w-md mx-auto px-4 py-10">
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-green-700 mb-4"
        >
          <ArrowLeft size={14} />
          প্রোফাইলে ফিরে যান
        </Link>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">তথ্য আপডেট করুন</h1>
          <p className="text-sm text-slate-500 mt-1">
            আপনার নাম পরিবর্তন করতে পারেন
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6">
          <UpdateForm
            key={session.user.name}
            initialName={session.user.name ?? ""}
          />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default UpdateProfilePage;
