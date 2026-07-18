"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "What's Next", href: "#upcoming-features" },
  { label: "Contact", href: "#contact" },
];
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-colors duration-300 ${
        scrolled
          ? "border-slate-200 bg-white/80 backdrop-blur-md"
          : "border-transparent bg-white/60 backdrop-blur-sm"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-indigo-600 font-display text-sm font-bold text-white">
            A
          </span>
          <span className="font-display text-[17px] font-semibold tracking-tight text-slate-900">
            Apna Interview
          </span>
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="group relative flex items-center gap-1.5 text-[14.5px] font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-slate-900 transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </div>
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/login"
            className="text-[14.5px] font-medium text-slate-600 transition-colors hover:text-slate-900"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="rounded-lg bg-slate-900 px-4 py-2 text-[14.5px] font-medium text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md"
          >
            Get Started
          </Link>
        </div>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-700 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <HiOutlineX size={22} /> : <HiOutlineMenu size={22} />}
        </button>
      </nav>
      {open && (
        <div className="border-t border-slate-200 bg-white px-6 py-4 md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-[15px] font-medium text-slate-700"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-3 border-t border-slate-200 pt-4">
              <Link
                href="/login"
                className="text-[15px] font-medium text-slate-700"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-slate-900 px-4 py-2.5 text-center text-[15px] font-medium text-white"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
