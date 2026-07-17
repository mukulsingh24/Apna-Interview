"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";
import { FiUser } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();

  const navLinks = [
    {
      name: "Dashboard",
      href: "/dashboard",
    },
    {
      name: "Resume Analysis",
      href: "/resume-analysis",
    },
    {
      name: "Job Match",
      href: "/job-match",
    },
    {
      name: "Interview Prep",
      href: "/interview",
    },
  ];

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 lg:px-10">
        
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 font-bold text-white">
            A
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              Apna Interview
            </h1>

            <p className="text-xs text-slate-500">
              Career Preparation Platform
            </p>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href="/profile"
            className={`flex h-10 w-10 items-center justify-center rounded-full transition ${
              pathname === "/profile"
                ? "bg-indigo-100 text-indigo-600"
                : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            }`}
            title="Profile"
          >
            <FiUser size={23} />
          </Link>

          <button
            onClick={handleLogout}
            className="cursor-pointer rounded-lg border border-slate-200 bg-white px-5 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}