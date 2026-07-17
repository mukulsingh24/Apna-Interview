"use client";

import { useState } from "react";
import ResumeUpload from "@/components/dashboard/ResumeUpload";
import JobMatch from "@/components/dashboard/JobMatch";
import { Analysis } from "@/types/analysis";

export default function JobMatchPage() {
  const [resumeText, setResumeText] = useState("");

  const handleAnalysisComplete = (analysis: Analysis) => {
    console.log("Resume analyzed:", analysis);
  };

  return (
    <main className="min-h-screen bg-[#f8f9fc] text-slate-900">
      <div className="mx-auto max-w-[1400px] px-6 py-10 lg:px-10">
        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-600">
            Job Match
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Match your resume with a job
          </h1>

          <p className="mt-2 text-slate-500">
            Upload your resume and compare it with a job description to
            discover your match score, matched skills, missing skills, and
            opportunities to improve your application.
          </p>
        </div>

        <ResumeUpload
          onAnalysisComplete={handleAnalysisComplete}
          onResumeTextExtracted={setResumeText}
        />

        {resumeText && <JobMatch resumeText={resumeText} />}
      </div>
    </main>
  );
}