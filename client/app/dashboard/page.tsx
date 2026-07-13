"use client";
import { useEffect,useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation";
import ResumeUpload from "@/components/dashboard/ResumeUpload";
export default function Dashboard() {
  const [checkingAuth, setCheckingAuth] = useState(true);
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
  <main className="min-h-screen bg-slate-100">
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-blue-600">
            Apna Interview
          </h1>
          <p className="text-sm text-gray-500">
            AI Resume Analyzer Dashboard
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </header>
    <div className="max-w-6xl mx-auto p-8">
      <ResumeUpload />
      <div className="grid md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-lg">
            ATS Score
          </h3>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-lg">
            Summary
          </h3>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-lg">
            Strengths
          </h3>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="font-semibold text-lg">
            Missing Skills
          </h3>
        </div>
      </div>
      <div className="mt-6 bg-white rounded-xl shadow p-6">
        <h3 className="font-semibold text-lg">
          Suggestions
        </h3>
      </div>
    </div>
  </main>
);
}