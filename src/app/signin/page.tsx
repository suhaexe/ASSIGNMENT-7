"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SignInPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("সব তথ্য পূরণ করুন");
      return;
    }

    setLoading(true);

    await signIn.email({
      email,
      password,
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন ইন সফল হয়েছে");
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "সাইন ইন ব্যর্থ হয়েছে");
          setLoading(false);
        },
      },
    });
  };

  const handleGoogle = () => {
    signIn.social({ provider: "google", callbackURL: "/" });
  };

  const handleGithub = () => {
    signIn.social({ provider: "github", callbackURL: "/" });
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-slate-900">সাইন ইন</h1>
            <p className="text-sm text-slate-500 mt-1">
              বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  ইমেইল
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                  পাসওয়ার্ড
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm focus:outline-none focus:border-green-500"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-2.5 rounded-lg transition"
              >
                {loading ? "অপেক্ষা করুন..." : "সাইন ইন"}
              </button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-slate-200" />
              <span className="text-xs text-slate-400">অথবা</span>
              <div className="flex-1 h-px bg-slate-200" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={handleGoogle}
                className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 rounded-lg py-2.5 text-sm font-medium text-slate-700 transition"
              >
                <FcGoogle size={18} />
                Google দিয়ে চালিয়ে যান
              </button>

              <button
                type="button"
                onClick={handleGithub}
                className="flex items-center justify-center gap-2 border border-slate-200 hover:bg-slate-50 rounded-lg py-2.5 text-sm font-medium text-slate-700 transition"
              >
                <FaGithub size={18} />
                GitHub দিয়ে চালিয়ে যান
              </button>
            </div>

            <p className="text-center text-sm text-slate-500 mt-6">
              অ্যাকাউন্ট নেই?{" "}
              <Link
                href="/signup"
                className="text-green-700 font-medium hover:underline"
              >
                সাইন আপ করুন
              </Link>
            </p>
          </div>

          <p className="text-center text-sm text-slate-500 mt-5">
            <Link href="/" className="hover:text-green-700">
              ← হোম পেজে ফিরে যান
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default SignInPage;
