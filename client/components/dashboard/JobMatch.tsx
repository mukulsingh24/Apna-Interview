"use client";

import { useState } from "react";
import { JobMatchAnalysis } from "@/types/jobMatchAnalysis";
interface JobMatchProps {
  resumeText: string;
}
export default function JobMatch({ resumeText }: JobMatchProps) {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [jobMatchAnalysis, setJobMatchAnalysis] =
    useState<JobMatchAnalysis | null>(null);
  const handleJobMatch = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter a job description.");
      return;
    }

    if (!resumeText) {
      alert("Please upload and analyze your resume first.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5050/api/resume/job-match",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resumeText: resumeText,
            jobDescription: jobDescription,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze job match.");
      }

      setJobMatchAnalysis(data.analysis);
    } catch (error) {
      console.error(error);
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
          Paste the job description you&apos;re applying for to see how well
          your resume matches the role.
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

        <div className="mt-2 flex justify-between text-xs text-slate-400">
          <span>
            Include skills, responsibilities, and requirements for better
            results.
          </span>

          <span>{jobDescription.length} characters</span>
        </div>
      </div>

      <button
        onClick={handleJobMatch}
        disabled={!jobDescription.trim() || loading}
        className="mt-6 flex w-full cursor-pointer items-center justify-center rounded-lg bg-slate-900 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
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
        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <p className="text-sm font-medium text-slate-500">
              JOB MATCH SCORE
            </p>

            <p className="mt-2 text-4xl font-bold text-slate-900">
              {jobMatchAnalysis.atsScore}%
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Matched Skills
              </h3>

              <ul className="mt-4 space-y-3">
                {jobMatchAnalysis.matchedSkills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <span className="text-emerald-500">✓</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Missing Skills
              </h3>

              <ul className="mt-4 space-y-3">
                {jobMatchAnalysis.missingSkills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <span className="text-amber-500">•</span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Matched Keywords
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {jobMatchAnalysis.matchedKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-emerald-50 px-3 py-1 text-sm text-emerald-700"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Missing Keywords
              </h3>

              <div className="mt-4 flex flex-wrap gap-2">
                {jobMatchAnalysis.missingKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              Why You Match
            </h3>

            <ul className="mt-4 space-y-3">
              {jobMatchAnalysis.strengths.map((strength, index) => (
                <li key={index} className="text-sm text-slate-700">
                  {index + 1}. {strength}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold text-slate-900">
              How to Improve Your Match
            </h3>

            <ul className="mt-4 space-y-3">
              {jobMatchAnalysis.suggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-slate-700">
                  {index + 1}. {suggestion}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
