"use client";

import { useRef, useState } from "react";
import { Analysis } from "@/types/analysis";

interface ResumeUploadProps {
  onAnalysisComplete: (analysis: Analysis) => void;
  onResumeTextExtracted: (resumeText: string) => void;
}

export default function ResumeUpload({
  onAnalysisComplete,onResumeTextExtracted
}: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch("http://localhost:5050/api/resume/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to analyze resume");
      }

      onAnalysisComplete(data.analysis);
      onResumeTextExtracted(data.resumeText);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }

    setFile(selectedFile);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <div>
        <p className="text-sm font-medium text-blue-600">Resume Upload</p>

        <h3 className="mt-1 text-xl font-semibold text-slate-900">
          Upload your resume
        </h3>

        <p className="mt-2 text-sm text-slate-500">
          Upload your PDF resume to analyze its ATS compatibility and get
          personalized improvement suggestions.
        </p>
      </div>

      <div
        onClick={() => inputRef.current?.click()}
        className="group mt-6 flex h-56 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/50 transition-all duration-200 hover:border-indigo-400 hover:bg-indigo-50/30"
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 transition-colors duration-200 group-hover:bg-indigo-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5h10.5a4.5 4.5 0 1 0-.42-8.98A6 6 0 1 0 5.33 9.14 3.75 3.75 0 0 0 6.75 19.5Z"
            />
          </svg>
        </div>

        <p className="font-medium text-slate-800">
          {file ? file.name : "Upload your resume"}
        </p>

        <p className="mt-2 text-sm text-slate-500">
          {file
            ? "Click to select a different file"
            : "Drag and drop or click to browse"}
        </p>

        {!file && (
          <p className="mt-3 text-xs text-slate-400">
            PDF only · Maximum file size 5 MB
          </p>
        )}
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className="mt-6 flex w-full cursor-pointer items-center justify-center rounded-lg bg-slate-900 py-3 font-medium text-white shadow-sm transition-all duration-200 hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
      >
        {loading ? (
          <span className="flex items-center gap-3">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
            Analyzing resume...
          </span>
        ) : (
          "Analyze Resume"
        )}
      </button>
    </div>
  );
}
