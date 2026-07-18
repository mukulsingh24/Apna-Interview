"use client";

import { useState } from "react";
import { JobMatchAnalysis } from "@/types/jobMatchAnalysis";
import { auth } from "@/app/firebase/firebase";
interface JobMatchProps {
  resumeText: string;
}
export default function JobMatch({ resumeText }: JobMatchProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobMatchAnalysis, setJobMatchAnalysis] =
    useState<JobMatchAnalysis | null>(null);
  const handleJobMatch = async () => {
  if (!jobDescription.trim()) return;

  try {
    setLoading(true);

    const user = auth.currentUser;

    if (!user) {
      console.error("User is not logged in.");
      return;
    }

    const token = await user.getIdToken();

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/job-match/analyze`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          resumeText,
          jobDescription,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || "Job match failed.");
    }

    console.log("Job Match Result:", data);

    setJobMatchAnalysis(data.analysis);
  } catch (error) {
    console.error("Job Match Error:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
  <div>
    <p className="text-sm font-medium text-indigo-600">
      Job Match Analysis
    </p>

    <h3 className="mt-1 text-xl font-semibold text-slate-900">
      Match your resume with a job
    </h3>

    <p className="mt-2 text-sm leading-6 text-slate-500">
      Paste the job description you&apos;re applying for to see how well your
      resume matches the role.
    </p>
  </div>

  <div className="mt-6">
    <label className="text-sm font-medium text-slate-700">
      Job Description
    </label>

    <textarea
      value={jobDescription}
      onChange={(e) => setJobDescription(e.target.value)}
      placeholder="Paste the complete job description here..."
      rows={10}
      className="mt-2 w-full resize-none rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
    />

    <div className="mt-2 flex justify-between gap-4 text-xs text-slate-400">
      <span>
        Include skills, responsibilities, and requirements for better results.
      </span>

      <span className="shrink-0">
        {jobDescription.length} characters
      </span>
    </div>
  </div>

  <button
    onClick={handleJobMatch}
    disabled={!jobDescription.trim() || loading}
    className="mt-6 flex w-full cursor-pointer items-center justify-center rounded-lg bg-slate-900 py-3 font-medium text-white transition-all duration-200 hover:bg-slate-800 hover:shadow-md disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none"
  >
    {loading ? (
      <span className="flex items-center gap-3">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
        Analyzing job match...
      </span>
    ) : (
      "Analyze Job Match"
    )}
  </button>

  {jobMatchAnalysis && (
    <div className="mt-10 space-y-6 animate-in fade-in slide-in-from-bottom-3 duration-500">

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
          <p className="mb-5 text-sm font-medium text-slate-500">
            JOB MATCH SCORE
          </p>

          <div
            className="relative flex h-40 w-40 items-center justify-center rounded-full"
            style={{
              background: `conic-gradient(#4f46e5 ${
                jobMatchAnalysis.atsScore * 3.6
              }deg, #e9eaf0 0deg)`,
            }}
          >
            <div className="absolute flex h-[124px] w-[124px] flex-col items-center justify-center rounded-full bg-white">
              <span className="text-4xl font-bold text-slate-900">
                {jobMatchAnalysis.atsScore}%
              </span>

              <span className="mt-1 text-xs text-slate-500">
                MATCH SCORE
              </span>
            </div>
          </div>

          <div className="mt-5 text-center">
            <p className="font-semibold text-slate-900">
              {jobMatchAnalysis.atsScore >= 80
                ? "Strong Match"
                : jobMatchAnalysis.atsScore >= 60
                  ? "Good Match"
                  : jobMatchAnalysis.atsScore >= 40
                    ? "Moderate Match"
                    : "Low Match"}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Your resume matches {jobMatchAnalysis.atsScore}% of this role
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
              ✦
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                Job Match Overview
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                How your resume aligns with this job description
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg bg-emerald-50/70 p-4">
              <p className="text-2xl font-bold text-emerald-700">
                {jobMatchAnalysis.matchedSkills.length}
              </p>

              <p className="mt-1 text-sm text-emerald-700">
                Skills Matched
              </p>
            </div>

            <div className="rounded-lg bg-amber-50/70 p-4">
              <p className="text-2xl font-bold text-amber-700">
                {jobMatchAnalysis.missingSkills.length}
              </p>

              <p className="mt-1 text-sm text-amber-700">
                Skills Missing
              </p>
            </div>

            <div className="rounded-lg bg-emerald-50/70 p-4">
              <p className="text-2xl font-bold text-emerald-700">
                {jobMatchAnalysis.matchedKeywords.length}
              </p>

              <p className="mt-1 text-sm text-emerald-700">
                Keywords Matched
              </p>
            </div>

            <div className="rounded-lg bg-amber-50/70 p-4">
              <p className="text-2xl font-bold text-amber-700">
                {jobMatchAnalysis.missingKeywords.length}
              </p>

              <p className="mt-1 text-sm text-amber-700">
                Keywords Missing
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              Matched Skills
            </h3>

            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
              {jobMatchAnalysis.matchedSkills.length} Matched
            </span>
          </div>

          <ul className="mt-6 space-y-4">
            {jobMatchAnalysis.matchedSkills.map((skill, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm leading-6 text-slate-600"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-600">
                  ✓
                </span>

                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              Missing Skills
            </h3>

            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
              {jobMatchAnalysis.missingSkills.length} Missing
            </span>
          </div>

          <ul className="mt-6 space-y-4">
            {jobMatchAnalysis.missingSkills.map((skill, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-sm leading-6 text-slate-600"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" />

                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              Matched Keywords
            </h3>

            <span className="text-xs text-slate-400">
              Found in your resume
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {jobMatchAnalysis.matchedKeywords.map((keyword, index) => (
              <span
                key={index}
                className="rounded-full bg-emerald-50 px-3 py-1.5 text-sm text-emerald-700 transition-transform duration-200 hover:scale-105"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              Missing Keywords
            </h3>

            <span className="text-xs text-slate-400">
              Found in job description
            </span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {jobMatchAnalysis.missingKeywords.map((keyword, index) => (
              <span
                key={index}
                className="rounded-full bg-amber-50 px-3 py-1.5 text-sm text-amber-700 transition-transform duration-200 hover:scale-105"
              >
                {keyword}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900">
            Why You Match
          </h3>

          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
            Your Advantages
          </span>
        </div>

        <div className="mt-6 space-y-4">
          {jobMatchAnalysis.strengths.map((strength, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-lg border border-slate-100 p-4 transition-colors duration-200 hover:bg-slate-50"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-sm font-semibold text-emerald-600">
                ✓
              </span>

              <p className="text-sm leading-6 text-slate-600">
                {strength}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm">
        <div>
          <h3 className="text-lg font-semibold text-slate-900">
            How to Improve Your Match
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Recommended steps to become a stronger candidate for this role
          </p>
        </div>

        <div className="mt-6 divide-y divide-slate-100">
          {jobMatchAnalysis.suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-start gap-4 py-5 first:pt-0 last:pb-0"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-indigo-50 text-sm font-semibold text-indigo-600">
                {index + 1}
              </span>

              <p className="text-sm leading-6 text-slate-600">
                {suggestion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )}
</div>
  );
}
