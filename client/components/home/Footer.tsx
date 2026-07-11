import Link from "next/link";
import { FiGithub, FiLinkedin } from "react-icons/fi";
const quickLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Contact", href: "#contact" },
];
export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
          <div className="col-span-2 sm:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-linear-to-br from-blue-600 to-indigo-600 font-display text-sm font-bold text-white">
                A
              </span>
              <span className="font-display text-[16px] font-semibold text-slate-900">
                Apna Interview
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-slate-500">
              AI-powered resume analysis and interview preparation.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://github.com/mukulsingh24"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900"
              >
                <FiGithub size={16} />
              </a>
              <a
                href="https://www.linkedin.com/in/mukulsingh9"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:border-slate-300 hover:text-slate-900"
              >
                <FiLinkedin size={16} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="text-[13px] font-semibold text-slate-900">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[13.5px] text-slate-500 transition-colors hover:text-slate-900"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-[13px] font-semibold text-slate-900">
              Get Started
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/register"
                  className="text-[13.5px] text-slate-500 transition-colors hover:text-slate-900"
                >
                  Create account
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="text-[13.5px] text-slate-500 transition-colors hover:text-slate-900"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-8 sm:flex-row">
          <p className="text-[13px] text-slate-400">
            © {new Date().getFullYear()} Apna Interview. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
