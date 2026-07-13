"use client";

import { useRef, useState } from "react";
import { Analysis } from "@/types/analysis";

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAnalyze = async () => {
    if (!file) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const response = await fetch(
        "http://localhost:5050/api/resume/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.message || "Something went wrong");
      }

      console.log(data);

      setAnalysis(data.analysis);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      alert("Please select a PDF file.");
      return;
    }

    setFile(selectedFile);
  };

  console.log(analysis);

  return (
    <div className="bg-white rounded-xl shadow p-8">
      <h3 className="text-xl font-semibold">Upload Resume</h3>

      <p className="text-gray-500 mt-2">
        Upload your PDF resume to receive an AI-powered ATS analysis.
      </p>

      <div
        className="mt-6 border-2 border-dashed border-gray-300 rounded-xl h-56 flex flex-col items-center justify-center cursor-pointer hover:border-blue-500 transition"
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        <p className="text-lg font-medium text-gray-700">
          {file ? file.name : "Drag & Drop Resume Here"}
        </p>

        <p className="text-sm text-gray-400 mt-2">
          or click to browse
        </p>
      </div>

      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className="mt-6 w-full bg-slate-900 text-white py-3 rounded-lg"
      >
        {loading ? "Analyzing Resume" : "Analyze Resume"}
      </button>
    </div>
  );
}