"use client";

import { Analysis } from "@/types/analysis";
import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { JobMatchAnalysis } from "@/types/jobMatchAnalysis";
import { InterviewSession } from "@/types/interviewSession";
export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [latestAnalysis, setLatestAnalysis] = useState<Analysis | null>(null);
  const [resumeHistory, setResumeHistory] = useState<Analysis[]>([]);
  const [jobMatchHistory, setJobMatchHistory] = useState<JobMatchAnalysis[]>(
    [],
  );
  const [latestJobMatch, setLatestJobMatch] = useState<JobMatchAnalysis | null>(
    null,
  );
  const [latestInterview, setLatestInterview] =
    useState<InterviewSession | null>(null);
  const [interviewHistory, setInterviewHistory] = useState<InterviewSession[]>(
    [],
  );
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        router.replace("/login");
        return;
      }

      setUser(currentUser);
      try {
        const token = await currentUser.getIdToken();

        const [resumeResponse, jobMatchResponse, interviewResponse] =
          await Promise.all([
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resume/history`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/job-match/history`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),

            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/interview/history`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }),
          ]);

        const resumeData = await resumeResponse.json();
        const jobMatchData = await jobMatchResponse.json();
        const interviewData = await interviewResponse.json();

        if (resumeResponse.ok && resumeData.history?.length > 0) {
          setLatestAnalysis(resumeData.history[0]);
          setResumeHistory(resumeData.history);
        }

        if (jobMatchResponse.ok && jobMatchData.history?.length > 0) {
          setLatestJobMatch(jobMatchData.history[0]);
          setJobMatchHistory(jobMatchData.history);
        }

        if (interviewResponse.ok && interviewData.history?.length > 0) {
          setLatestInterview(interviewData.history[0]);
          setInterviewHistory(interviewData.history);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard history:", error);
      } finally {
        setCheckingAuth(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f9fc]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
          <p className="text-sm text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const userName = user?.displayName || user?.email?.split("@")[0] || "there";
  const recentActivity = [
    ...resumeHistory.map((item) => ({
      id: `resume-${item.id}`,
      type: "resume" as const,
      title: "Resume analyzed",
      description: item.fileName || "Resume",
      score: item.atsScore,
      createdAt: item.createdAt,
    })),

    ...jobMatchHistory.map((item) => ({
      id: `job-${item.id}`,
      type: "job" as const,
      title: "Job match analyzed",
      description: "Job Description Match",
      score: item.atsScore,
      createdAt: item.createdAt,
    })),
    ...interviewHistory
      .filter((item) => item.overallScore !== null)
      .map((item) => ({
        id: `interview-${item.id}`,
        type: "interview" as const,
        title: "Interview completed",
        description: `${item.targetRole} · ${item.difficulty}`,
        score: item.overallScore as number,
        createdAt: item.completedAt || item.createdAt,
      })),
  ]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0).getTime() -
        new Date(a.createdAt || 0).getTime(),
    )
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-[#f8f9fc] text-slate-900">
      <div className="mx-auto max-w-[1400px] px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-indigo-600">
              Career Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">
              Welcome back, {userName}
            </h1>

            <p className="mt-3 max-w-2xl text-slate-500">
              Track your career preparation, improve your resume, match with
              opportunities, and prepare for your next interview.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Resume Score
                </p>

                <p className="mt-4 text-3xl font-bold text-slate-900">
                  {latestAnalysis ? (
                    <>
                      {latestAnalysis.atsScore}
                      <span className="text-base font-medium text-slate-400">
                        /100
                      </span>
                    </>
                  ) : (
                    "—"
                  )}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                📄
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Analyze your resume to get your latest score.
            </p>

            <Link
              href="/resume-analysis"
              className="mt-5 inline-flex text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
            >
              Analyze resume →
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Job Match Score
                </p>

                <p className="mt-4 text-3xl font-bold text-slate-900">
                  {latestJobMatch ? (
                    <>
                      {latestJobMatch.atsScore}
                      <span className="text-base font-medium text-slate-400">
                        /100
                      </span>
                    </>
                  ) : (
                    "—"
                  )}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
                🎯
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Compare your resume with a job description.
            </p>

            <Link
              href="/job-match"
              className="mt-5 inline-flex text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
            >
              Check job match →
            </Link>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  Interview Readiness
                </p>

                <p className="mt-4 text-3xl font-bold text-slate-900">
                  {latestInterview?.overallScore != null ? (
                    <>
                      {latestInterview.overallScore}
                      <span className="text-base font-medium text-slate-400">
                        /100
                      </span>
                    </>
                  ) : (
                    "—"
                  )}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-xl">
                💬
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Complete an interview session to track readiness.
            </p>

            <Link
              href="/interview"
              className="mt-5 inline-flex text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
            >
              Start practicing →
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>

            <p className="mt-1 text-sm text-slate-500">
              Continue your career preparation.
            </p>
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-3">
            <Link
              href="/resume-analysis"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
                📄
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Analyze Resume
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Get an AI-powered resume score, identify weaknesses, missing
                sections, and actionable improvements.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-indigo-600">
                Start analysis
                <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </Link>

            <Link
              href="/job-match"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-2xl">
                🎯
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Match a Job
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Compare your resume with a job description and discover matched
                skills, missing keywords, and improvement opportunities.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-indigo-600">
                Analyze job match
                <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </Link>

            <Link
              href="/interview"
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-2xl">
                💬
              </div>

              <h3 className="mt-5 text-lg font-semibold text-slate-900">
                Interview Preparation
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Practice role-based interview questions and prepare for
                technical interviews with personalized feedback.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-medium text-indigo-600">
                Start preparing
                <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </Link>
          </div>
        </section>

        <section className="mt-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Recent Activity
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Track your latest resume analyses, job matches, and interview
                  sessions.
                </p>
              </div>

              {recentActivity.length > 0 && (
                <Link
                  href="/history"
                  className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700"
                >
                  View all activity →
                </Link>
              )}
            </div>

            {recentActivity.length > 0 ? (
              <div className="mt-6 divide-y divide-slate-100">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex flex-col gap-4 py-5 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="flex min-w-0 items-center gap-4">
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
                          {activity.description}
                        </p>
                      </div>
                    </div>

                    <div className="pl-15 text-left sm:pl-0 sm:text-right">
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

                      {activity.createdAt && (
                        <p className="mt-2 text-xs text-slate-400">
                          {new Date(activity.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            },
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex min-h-64 flex-col items-center justify-center text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-xl">
                  📊
                </div>

                <p className="mt-4 font-medium text-slate-800">
                  No activity yet
                </p>

                <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
                  Your resume analyses, job matches, and interview practice
                  sessions will appear here once you start using the platform.
                </p>

                <Link
                  href="/resume-analysis"
                  className="mt-5 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Analyze your first resume
                </Link>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
