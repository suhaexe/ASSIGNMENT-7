"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User, LogOut, Pencil } from "lucide-react";
import { useSession, signOut } from "@/lib/auth-client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (!isPending && !session) {
      toast.error("প্রোফাইল দেখতে সাইন ইন করুন");
      router.push("/signin");
    }
  }, [session, isPending, router]);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল হয়েছে");
          router.push("/");
        },
        onError: () => {
          toast.error("সাইন আউট করতে সমস্যা হয়েছে");
        },
      },
    });
  };

  if (isPending) {
    return (
      <>
        <Navbar />
        <main className="max-w-2xl mx-auto px-4 py-10">
          <div className="animate-pulse space-y-4">
            <div className="h-7 bg-slate-100 rounded w-40" />
            <div className="h-4 bg-slate-100 rounded w-64" />
            <div className="h-24 bg-slate-100 rounded-xl mt-6" />
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
      <main className="max-w-2xl mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">আমার প্রোফাইল</h1>
          <p className="text-sm text-slate-500 mt-1">
            আপনার অ্যাকাউন্টের তথ্য দেখুন
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-700 shrink-0">
            {session.user.image ? (
              <img
                src={session.user.image}
                alt=""
                className="w-14 h-14 rounded-full object-cover"
              />
            ) : (
              <User size={24} />
            )}
          </div>

          <div className="flex-1 min-w-0">
            <p className="font-semibold text-slate-900 truncate">
              {session.user.name}
            </p>
            <p className="text-sm text-slate-500 truncate">
              {session.user.email}
            </p>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-sm text-red-600 border border-red-200 hover:bg-red-50 px-3 py-2 rounded-lg transition shrink-0"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">সাইন আউট</span>
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 mt-5">
          <h2 className="text-base font-semibold text-slate-800 mb-4">তথ্য</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              নাম
            </label>
            <input
              type="text"
              value={session.user.name}
              readOnly
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2.5 text-sm bg-slate-50 text-slate-600 cursor-not-allowed"
            />
          </div>

          <Link
            href="/profile/update"
            className="mt-4 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2.5 rounded-lg transition text-sm"
          >
            <Pencil size={14} />
            তথ্য আপডেট করুন
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProfilePage;
