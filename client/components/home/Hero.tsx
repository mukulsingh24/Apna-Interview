import Link from "next/link";
import { HiOutlinePlay } from "react-icons/hi";
import { FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import ScoreGauge from "./ScoreGauge";
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-16 pb-20 sm:pt-24 sm:pb-28">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-45 h-130 w-205 -translate-x-1/2 rounded-full bg-linear-to-br from-blue-100 via-indigo-50 to-transparent opacity-70 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 lg:grid-cols-2 lg:gap-12 lg:px-8">
        <div>
          <h1 className="font-display mt-6 text-[42px] font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            Land More Interviews
            <br />
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              with AI
            </span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-600">
            Upload your resume and get an instant ATS score, a clear skill-gap
            breakdown, and AI-written improvements — then practice the
            interview questions recruiters actually ask.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_1px_2px_rgba(15,23,42,0.08),0_12px_24px_-8px_rgba(37,99,235,0.45)] transition-all duration-200 hover:shadow-[0_1px_2px_rgba(15,23,42,0.08),0_16px_32px_-8px_rgba(37,99,235,0.55)] hover:-translate-y-0.5"
            >
              Analyze Resume
            </Link>
            <Link
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-700 transition-all duration-200 hover:border-slate-300 hover:bg-slate-50"
            >
              <HiOutlinePlay className="text-slate-500" size={17} />
              View Demo
            </Link>
          </div>
          <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <FiCheckCircle className="text-blue-600" size={16} />
              Results in under 30 seconds
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_24px_48px_-12px_rgba(15,23,42,0.14)] sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[13px] font-medium text-slate-400">
                  Resume
                </p>
                <p className="font-display text-[15px] font-semibold text-slate-900">
                  Resume.pdf
                </p>
              </div>
              <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-600">
                Analysis Complete
              </span>
            </div>
            <div className="mt-6 flex items-center gap-5 rounded-xl bg-slate-50 p-5">
              <ScoreGauge score={87} size={92} strokeWidth={8} />
              <div>
                <p className="font-display text-[15px] font-semibold text-slate-900">
                  Strong ATS match
                </p>
                <p className="mt-1 text-[13px] leading-relaxed text-slate-500">
                  Your resume beats 87% of applicants for this role.
                </p>
              </div>
            </div>
            <div className="mt-5 space-y-2.5">
              <div className="flex items-center justify-between rounded-lg border border-slate-100 px-3.5 py-2.5">
                <span className="flex items-center gap-2 text-[13.5px] text-slate-700">
                  <FiCheckCircle className="text-blue-600" size={15} />
                  React &amp; TypeScript
                </span>
                <span className="text-[12px] font-medium text-slate-400">
                  Matched
                </span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-slate-100 px-3.5 py-2.5">
                <span className="flex items-center gap-2 text-[13.5px] text-slate-700">
                  <FiAlertCircle className="text-amber-500" size={15} />
                  System Design
                </span>
                <span className="text-[12px] font-medium text-amber-600">
                  Missing
                </span>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-xl border border-slate-200 bg-white/90 px-4 py-3 shadow-lg backdrop-blur-sm sm:block">
            <p className="text-[11px] font-medium text-slate-400">
              Interview Readiness
            </p>
            <p className="font-display text-lg font-bold text-slate-900">
              +34%{" "}
              <span className="text-[12px] font-medium text-emerald-600">
                this week
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
