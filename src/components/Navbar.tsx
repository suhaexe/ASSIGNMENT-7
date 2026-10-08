"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import { getBnDate, cn } from "@/lib/utils";
import { LogOut, User, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";

const categories = [
  { name: "চাল", slug: "chal", icon: "🍚" },
  { name: "ডাল", slug: "dal", icon: "🫘" },
  { name: "তেল", slug: "tel", icon: "🛢️" },
  { name: "সবজি", slug: "sobji", icon: "🥬" },
  { name: "মাছ", slug: "mach", icon: "🐟" },
  { name: "মাংস", slug: "mangsho", icon: "🍗" },
  { name: "ডিম-দুধ", slug: "dim-dui", icon: "🥛" },
  { name: "মসলা", slug: "mosla", icon: "🌶️" },
];

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("সাইন আউট সফল হয়েছে");
          setMenuOpen(false);
        },
        onError: () => {
          toast.error("সাইন আউট করতে সমস্যা হয়েছে");
        },
      },
    });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg bg-green-600 flex items-center justify-center text-white text-lg shadow-sm">
            🛒
          </div>
          <div className="leading-tight">
            <h1 className="text-base font-bold text-slate-900 group-hover:text-green-700 transition">
              বাজার দর
            </h1>
            <p className="text-[11px] text-slate-500">{getBnDate()}</p>
          </div>
        </Link>

        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="h-9 w-20 rounded-lg bg-slate-100 animate-pulse" />
          ) : session ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition"
              >
                <div className="w-7 h-7 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                  {session.user.image ? (
                    <img
                      src={session.user.image}
                      alt=""
                      className="w-7 h-7 rounded-full object-cover"
                    />
                  ) : (
                    <User size={14} />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-700 hidden sm:inline max-w-[100px] truncate">
                  {session.user.name}
                </span>
                <ChevronDown size={14} className="text-slate-400" />
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-800 truncate">
                      {session.user.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {session.user.email}
                    </p>
                  </div>
                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50"
                  >
                    <User size={14} />
                    আমার প্রোফাইল
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 border-t border-slate-100"
                  >
                    <LogOut size={14} />
                    সাইন আউট
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/signin"
                className="text-sm font-medium text-slate-700 hover:text-green-700 px-3 py-2 transition"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="text-sm font-semibold bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-sm transition"
              >
                সাইন আপ
              </Link>
            </>
          )}
        </div>
      </div>

      <nav className="border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-1.5 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => {
            const active = pathname === `/category/${cat.slug}`;
            return (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm whitespace-nowrap transition",
                  active
                    ? "bg-green-600 text-white font-medium shadow-sm"
                    : "text-slate-600 hover:bg-slate-100",
                )}
              >
                <span className="text-xs">{cat.icon}</span>
                {cat.name}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
