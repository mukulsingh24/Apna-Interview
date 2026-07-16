"use client";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation";
import ResumeUpload from "@/components/dashboard/ResumeUpload";
import { Analysis } from "@/types/analysis";
import JobMatch from "@/components/dashboard/JobMatch";
export default function Dashboard() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [resumeAnalysis, setResumeAnalysis] = useState<Analysis | null>(null);
  const [resumeText, setResumeText] = useState("");
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/login");
    } catch (err) {
      console.error(err);
    }
  };
  if (checkingAuth) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-[#f8f9fc] text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center text-white font-bold">
              A
            </div>

            <div>
              <h1 className="text-lg font-bold text-slate-900">
                Apna Interview
              </h1>
              <p className="text-xs text-slate-500">
                Resume Analyzer Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="px-5 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 md:px-8 py-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">Resume Analysis</p>

          <h2 className="text-3xl font-bold tracking-tight mt-1">
            Analyze your resume
          </h2>

          <p className="text-slate-500 mt-2">
            Upload your resume to get your ATS score, strengths, skill gaps, and
            personalized suggestions.
          </p>
        </div>

        <ResumeUpload
          onAnalysisComplete={setResumeAnalysis}
          onResumeTextExtracted={setResumeText}
        />

        {resumeAnalysis && (
          <div className="mt-10 space-y-6">
            <div className="grid lg:grid-cols-[320px_1fr] gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-7 shadow-sm flex flex-col items-center justify-center">
                <p className="text-sm font-medium text-slate-500 mb-5">
                  RESUME SCORE
                </p>

                <div
                  className="relative w-40 h-40 rounded-full flex items-center justify-center"
                  style={{
                    background: `conic-gradient(#4f46e5 ${resumeAnalysis.atsScore * 3.6}deg, #e9eaf0 0deg)`,
                  }}
                >
                  <div className="absolute w-[124px] h-[124px] bg-white rounded-full flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold text-slate-900">
                      {resumeAnalysis.atsScore}
                    </span>

                    <span className="text-xs text-slate-500 mt-1">
                      RESUME Score
                    </span>
                  </div>
                </div>

                <div className="mt-5 text-center">
                  <p className="font-semibold text-slate-900">
                    {resumeAnalysis.atsScore >= 80
                      ? "Strong Resume match"
                      : resumeAnalysis.atsScore >= 60
                        ? "Good Resume match"
                        : "Needs improvement"}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    Your resume scored {resumeAnalysis.atsScore} out of 100
                  </p>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-7 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                    ✦
                  </div>

                  <h3 className="text-lg font-semibold">Analysis Summary</h3>
                </div>

                <p className="text-slate-600 mt-5 leading-7">
                  {resumeAnalysis.summary}
                </p>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-7 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Strengths</h3>

                  <span className="text-xs font-medium bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full">
                    {resumeAnalysis.strengths.length} Found
                  </span>
                </div>

                <ul className="mt-6 space-y-4">
                  {resumeAnalysis.strengths.map((strength, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-slate-600 leading-6"
                    >
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold">
                        ✓
                      </span>
                      <span>{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-7 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">
                    Areas for Improvement
                  </h3>

                  <span className="text-xs font-medium bg-amber-50 text-amber-600 px-3 py-1 rounded-full">
                    {resumeAnalysis.weaknesses.length} Found
                  </span>
                </div>

                <ul className="mt-6 space-y-4">
                  {resumeAnalysis.weaknesses.map((weakness, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-sm text-slate-600 leading-6"
                    >
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                      <span>{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-7 shadow-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Missing Sections</h3>

                <span className="text-xs font-medium bg-violet-50 text-violet-600 px-3 py-1 rounded-full">
                  {resumeAnalysis.missingSections.length} Missing
                </span>
              </div>

              <ul className="mt-6 space-y-4">
                {resumeAnalysis.missingSections.map((section, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-slate-600 leading-6"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-violet-500" />
                    <span>{section}</span>
                  </li>
                ))}
              </ul>
            </div>{" "}
            <div className="bg-white border border-slate-200 rounded-xl p-7 shadow-sm">
              <div>
                <h3 className="text-lg font-semibold">Recommendations</h3>

                <p className="text-sm text-slate-500 mt-1">
                  Actionable improvements to strengthen your resume
                </p>
              </div>

              <div className="mt-6 divide-y divide-slate-100">
                {resumeAnalysis.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    <span className="flex-shrink-0 w-7 h-7 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm font-semibold">
                      {index + 1}
                    </span>

                    <p className="text-sm text-slate-600 leading-6">
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <JobMatch resumeText={resumeText} />
          </div>
        )}
      </div>
    </main>
  );
}
