"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/app/firebase/firebase";
import { FiUser, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      setMobileMenuOpen(false);
      router.replace("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4 py-4 sm:px-6 lg:px-10">
        <Link
          href="/dashboard"
          className="flex min-w-0 items-center gap-3"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 font-bold text-white">
            A
          </div>

          <div className="min-w-0">
            <h1 className="truncate text-base font-bold text-slate-900 sm:text-lg">
              Apna Interview
            </h1>

            <p className="hidden text-xs text-slate-500 sm:block">
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

        <div className="hidden items-center gap-3 lg:flex">
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

        <button
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-slate-700 transition hover:bg-slate-100 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <FiX size={24} />
          ) : (
            <FiMenu size={24} />
          )}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-5 pt-3 sm:px-6 lg:hidden">
          <nav className="mx-auto flex max-w-[1400px] flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-indigo-50 text-indigo-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            <Link
              href="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className={`mt-1 flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition ${
                pathname === "/profile"
                  ? "bg-indigo-50 text-indigo-600"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <FiUser size={19} />
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="mt-3 cursor-pointer rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Logout
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}