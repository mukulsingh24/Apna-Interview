"use client";

import { useEffect, useState } from "react";
import { auth } from "@/app/firebase/firebase";

export default function ProfilePage() {
  const [fullName, setFullName] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = auth.currentUser;

        if (!user) {
          setLoading(false);
          return;
        }

        setEmail(user.email || "");

        const token = await user.getIdToken();

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load profile.",
          );
        }

        if (data.profile) {
          setFullName(data.profile.fullName || "");
          setTargetRole(data.profile.targetRole || "");
          setExperienceLevel(
            data.profile.experienceLevel || "",
          );
          setEducation(data.profile.education || "");

          setSkills(
            Array.isArray(data.profile.skills)
              ? data.profile.skills.join(", ")
              : "",
          );
        }
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Failed to load profile.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSaveProfile = async () => {
    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const user = auth.currentUser;

      if (!user) {
        setError("You must be logged in.");
        return;
      }

      const token = await user.getIdToken();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            fullName: fullName.trim(),
            targetRole: targetRole.trim(),
            experienceLevel,
            education: education.trim(),
            skills: skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean),
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save profile.",
        );
      }

      setMessage("Profile saved successfully.");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Failed to save profile.",
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-[80vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />

          <p className="text-sm text-slate-500">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-10 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-indigo-600">
            Your Profile
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Profile Settings
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your professional information and career
            preferences.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium text-slate-700">
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>

              <input
                type="email"
                value={email}
                disabled
                className="mt-2 w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Target Role
              </label>

              <input
                type="text"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g. Software Engineer"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-700">
                Experience Level
              </label>

              <select
                value={experienceLevel}
                onChange={(e) =>
                  setExperienceLevel(e.target.value)
                }
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              >
                <option value="">Select experience level</option>
                <option value="Student">Student</option>
                <option value="Fresher">Fresher</option>
                <option value="Junior">Junior</option>
                <option value="Mid Level">Mid Level</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-slate-700">
              Education
            </label>

            <input
              type="text"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="e.g. B.Tech in Artificial Intelligence and Machine Learning"
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="mt-6">
            <label className="text-sm font-medium text-slate-700">
              Skills
            </label>

            <textarea
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              rows={4}
              placeholder="Java, Python, React, Next.js, Node.js, PostgreSQL"
              className="mt-2 w-full resize-none rounded-lg border border-slate-300 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

            <p className="mt-2 text-xs text-slate-400">
              Separate each skill with a comma.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {message && (
            <div className="mt-6 rounded-lg bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </div>
          )}

          <button
            onClick={handleSaveProfile}
            disabled={saving || !fullName.trim()}
            className="mt-8 flex w-full cursor-pointer items-center justify-center rounded-lg bg-slate-900 py-3 font-medium text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {saving ? (
              <span className="flex items-center gap-3">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Saving Profile...
              </span>
            ) : (
              "Save Profile"
            )}
          </button>
        </div>
      </div>
    </main>
  );
}