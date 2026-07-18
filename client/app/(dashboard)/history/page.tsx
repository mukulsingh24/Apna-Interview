"use client";

import { useEffect, useState } from "react";
import { auth } from "@/app/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Link from "next/link";

type ResumeActivity = {
  id: string;
  fileName: string;
  atsScore: number;
  createdAt: string;
};

type JobMatchActivity = {
  id: string;
  atsScore: number;
  createdAt: string;
};

type InterviewActivity = {
  id: string;
  role?: string;
  score?: number;
  createdAt: string;
};

type Activity = {
  id: string;
  type: "resume" | "job" | "interview";
  title: string;
  subtitle: string;
  score?: number;
  createdAt: string;
};

export default function HistoryPage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const token = await user.getIdToken();

        const [resumeResponse, jobMatchResponse, interviewResponse] =
          await Promise.all([
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/resume/history`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            ),
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/job-match/history`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            ),
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/interview/history`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              },
            ),
          ]);

        const resumeData = await resumeResponse.json();
        const jobMatchData = await jobMatchResponse.json();
        const interviewData = await interviewResponse.json();

        const resumeActivities: Activity[] = (
          resumeData.history || []
        ).map((item: ResumeActivity) => ({
          id: `resume-${item.id}`,
          type: "resume",
          title: "Resume Analyzed",
          subtitle: item.fileName || "Resume",
          score: item.atsScore,
          createdAt: item.createdAt,
        }));

        const jobActivities: Activity[] = (
          jobMatchData.history || []
        ).map((item: JobMatchActivity) => ({
          id: `job-${item.id}`,
          type: "job",
          title: "Job Match Analyzed",
          subtitle: "Resume compared with job description",
          score: item.atsScore,
          createdAt: item.createdAt,
        }));

        const interviewActivities: Activity[] = (
          interviewData.history || []
        ).map((item: InterviewActivity) => ({
          id: `interview-${item.id}`,
          type: "interview",
          title: "Interview Practice",
          subtitle: item.role
            ? `${item.role} interview`
            : "Interview preparation session",
          score: item.score,
          createdAt: item.createdAt,
        }));

        const combinedActivities = [
          ...resumeActivities,
          ...jobActivities,
          ...interviewActivities,
        ].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime(),
        );

        setActivities(combinedActivities);
      } catch (error) {
        console.error("Failed to fetch activity history:", error);
        setError("Failed to load activity history.");
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
          <p className="text-sm text-slate-500">
            Loading activity history...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-600">
            Your Activity
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Activity History
          </h1>

          <p className="mt-2 text-slate-500">
            Track your resume analyses, job matches, and interview
            preparation sessions.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {activities.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg ${
                        activity.type === "resume"
                          ? "bg-indigo-50"
                          : activity.type === "job"
                            ? "bg-emerald-50"
                            : "bg-violet-50"
                      }`}
                    >
                      {activity.type === "resume"
                        ? "📄"
                        : activity.type === "job"
                          ? "🎯"
                          : "💬"}
                    </div>

                    <div>
                      <p className="font-medium text-slate-900">
                        {activity.title}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        {activity.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="ml-15 flex items-center gap-4 sm:ml-0 sm:flex-col sm:items-end sm:gap-1">
                    {activity.score !== undefined && (
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${
                          activity.type === "resume"
                            ? "bg-indigo-50 text-indigo-700"
                            : activity.type === "job"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-violet-50 text-violet-700"
                        }`}
                      >
                        Score {activity.score}/100
                      </span>
                    )}

                    <p className="text-xs text-slate-400">
                      {new Date(
                        activity.createdAt,
                      ).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex min-h-80 flex-col items-center justify-center px-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                📊
              </div>

              <p className="mt-4 font-medium text-slate-800">
                No activity yet
              </p>

              <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                Your resume analyses, job matches, and interview
                preparation sessions will appear here.
              </p>

              <Link
                href="/resume-analysis"
                className="mt-5 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Analyze your resume
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}