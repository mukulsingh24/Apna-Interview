"use client";

import { useState } from "react";
import { auth } from "@/app/firebase/firebase";

interface InterviewQuestion {
  id: number;
  question: string;
}

interface InterviewSession {
  id: number;
  targetRole: string;
  difficulty: string;
  interviewType: string;
  totalQuestions: number;
  questions: InterviewQuestion[];
  status: string;
}

interface InterviewResult {
  overallScore: number;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  recommendedTopics: string[];
  questionFeedback: {
    questionId: number;
    score: number;
    feedback: string;
  }[];
}

export default function InterviewPage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [currentAnswer, setCurrentAnswer] = useState("");
const [answers, setAnswers] = useState<
  { questionId: number; question: string; answer: string }[]
>([]);
const [interviewResult, setInterviewResult] =
  useState<InterviewResult | null>(null);
  const [targetRole, setTargetRole] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [interviewType, setInterviewType] = useState("Technical");
  const [totalQuestions, setTotalQuestions] = useState(5);

  const [loading, setLoading] = useState(false);
  const [session, setSession] = useState<InterviewSession | null>(null);
  const [error, setError] = useState("");

  const handleSubmitAnswer = async () => {
  if (!session) return;

  if (!currentAnswer.trim()) {
    setError("Please enter your answer before continuing.");
    return;
  }

  const currentQuestion = session.questions[currentQuestionIndex];

  const newAnswer = {
    questionId: currentQuestion.id,
    question: currentQuestion.question,
    answer: currentAnswer.trim(),
  };

  const updatedAnswers = [...answers, newAnswer];

  setAnswers(updatedAnswers);
  setCurrentAnswer("");
  setError("");

  if (currentQuestionIndex < session.questions.length - 1) {
    setCurrentQuestionIndex((prev) => prev + 1);
    return;
  }

  try {
    setLoading(true);

    const user = auth.currentUser;

    if (!user) {
      setError("You must be logged in.");
      return;
    }

    const token = await user.getIdToken();

    const response = await fetch(
      `http://localhost:5050/api/interview/${session.id}/complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          answers: updatedAnswers,
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.error ||
          data.message ||
          "Failed to complete interview.",
      );
    }

    console.log("Interview Result:", data);

    setInterviewResult(data.evaluation);
  } catch (error) {
    setError(
      error instanceof Error
        ? error.message
        : "Failed to evaluate interview.",
    );
  } finally {
    setLoading(false);
  }
};
  const handleStartInterview = async () => {
    if (!targetRole.trim()) {
      setError("Please enter your target role.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const user = auth.currentUser;

      if (!user) {
        setError("You must be logged in.");
        return;
      }

      const token = await user.getIdToken();

      const response = await fetch(
        "http://localhost:5050/api/interview/start",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            targetRole,
            difficulty,
            interviewType,
            totalQuestions,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Failed to start interview.",
        );
      }

      console.log("Interview Session:", data);

      setSession(data.session);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong.",
      );
    } finally {
      setLoading(false);
    }
  };
if (interviewResult) {
  return (
    <main className="min-h-screen bg-[#f8f9fc] px-6 py-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-600">
            Interview Complete
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Your Interview Results
          </h1>

          <p className="mt-2 text-slate-500">
            Review your performance, strengths, and areas that need improvement.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-medium text-slate-500">
              INTERVIEW SCORE
            </p>

            <div
              className="relative mt-6 flex h-40 w-40 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#4f46e5 ${
                  interviewResult.overallScore * 3.6
                }deg, #e9eaf0 0deg)`,
              }}
            >
              <div className="absolute flex h-[124px] w-[124px] flex-col items-center justify-center rounded-full bg-white">
                <span className="text-4xl font-bold text-slate-900">
                  {interviewResult.overallScore}
                </span>

                <span className="mt-1 text-xs text-slate-500">
                  OUT OF 100
                </span>
              </div>
            </div>

            <p className="mt-6 font-semibold text-slate-900">
              {interviewResult.overallScore >= 80
                ? "Strong Performance"
                : interviewResult.overallScore >= 60
                  ? "Good Performance"
                  : "Needs Improvement"}
            </p>

            {session && (
              <p className="mt-2 text-center text-sm text-slate-500">
                {session.targetRole} · {session.difficulty}
              </p>
            )}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">
              Performance Summary
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              {interviewResult.summary}
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Strengths
              </h2>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                {interviewResult.strengths.length} Found
              </span>
            </div>

            <ul className="mt-6 space-y-4">
              {interviewResult.strengths.map((strength, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-xs font-bold text-emerald-600">
                    ✓
                  </span>

                  <span>{strength}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">
                Areas for Improvement
              </h2>

              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                {interviewResult.weaknesses.length} Found
              </span>
            </div>

            <ul className="mt-6 space-y-4">
              {interviewResult.weaknesses.map((weakness, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-sm leading-6 text-slate-600"
                >
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-amber-500" />

                  <span>{weakness}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">
            Recommended Topics to Study
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Focus on these topics before your next interview.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {interviewResult.recommendedTopics.map((topic, index) => (
              <span
                key={index}
                className="rounded-lg bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Question Breakdown
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Detailed feedback for each interview question.
            </p>
          </div>

          <div className="mt-6 divide-y divide-slate-100">
            {interviewResult.questionFeedback.map((item, index) => (
              <div
                key={item.questionId}
                className="py-6 first:pt-0 last:pb-0"
              >
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-indigo-600">
                      Question {index + 1}
                    </p>

                    {session && (
                      <p className="mt-2 font-medium leading-6 text-slate-900">
                        {
                          session.questions.find(
                            (question) =>
                              question.id === item.questionId,
                          )?.question
                        }
                      </p>
                    )}
                  </div>

                  <span className="shrink-0 rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                    {item.score}/10
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {item.feedback}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={() => {
            setSession(null);
            setInterviewResult(null);
            setAnswers([]);
            setCurrentQuestionIndex(0);
            setCurrentAnswer("");
          }}
          className="mt-8 w-full cursor-pointer rounded-lg bg-slate-900 py-3 font-medium text-white transition hover:bg-slate-800"
        >
          Start Another Interview
        </button>
      </div>
    </main>
  );
}
  if (session) {
    return (
      <main className="min-h-screen bg-[#f8f9fc] px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-600">
                  Interview in Progress
                </p>

                <h1 className="mt-1 text-2xl font-bold text-slate-900">
                  {session.targetRole}
                </h1>
              </div>

              <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
                {session.difficulty}
              </span>
            </div>

            <div className="mt-8">
              <p className="text-sm font-medium text-slate-500">
  Question {currentQuestionIndex + 1} of {session.totalQuestions}
</p>

              <h2 className="mt-3 text-xl font-semibold leading-8 text-slate-900">
                {session.questions[currentQuestionIndex]?.question}
              </h2>
            </div>

            <textarea
  rows={8}
  value={currentAnswer}
  onChange={(e) => setCurrentAnswer(e.target.value)}
  placeholder="Type your answer here..."
  className="mt-6 w-full resize-none rounded-xl border border-slate-300 px-4 py-4 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
/>
{error && (
  <p className="mt-3 text-sm text-red-500">
    {error}
  </p>
)}  
            <button
  onClick={handleSubmitAnswer}
  disabled={!currentAnswer.trim()}
  className="mt-6 w-full cursor-pointer rounded-lg bg-slate-900 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
>
  {currentQuestionIndex === session.questions.length - 1
    ? "Finish Interview"
    : "Submit Answer"}
</button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f8f9fc] px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-600">
            AI Mock Interview
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Practice your interview
          </h1>

          <p className="mt-2 text-slate-500">
            Configure your mock interview and practice with
            AI-generated questions tailored to your target role.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Target Role
            </label>

            <input
              type="text"
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              placeholder="e.g. Flutter Developer"
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Difficulty
              </label>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Interview Type
              </label>

              <select
                value={interviewType}
                onChange={(e) => setInterviewType(e.target.value)}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none"
              >
                <option value="Technical">Technical</option>
                <option value="Behavioral">Behavioral</option>
                <option value="Mixed">Mixed</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-slate-700">
              Number of Questions
            </label>

            <select
              value={totalQuestions}
              onChange={(e) =>
                setTotalQuestions(Number(e.target.value))
              }
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none"
            >
              <option value={5}>5 Questions</option>
              <option value={10}>10 Questions</option>
            </select>
          </div>

          {error && (
            <p className="mt-5 text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            onClick={handleStartInterview}
            disabled={loading || !targetRole.trim()}
            className="mt-8 flex w-full cursor-pointer items-center justify-center rounded-lg bg-slate-900 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {loading ? (
              <span className="flex items-center gap-3">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Preparing Interview...
              </span>
            ) : (
              "Start Interview"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}