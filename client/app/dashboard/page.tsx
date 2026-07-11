"use client";
import { useEffect,useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useRouter } from "next/navigation";
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
    <main className="min-h-screen bg-gray-100">
      <div className="bg-white shadow px-8 py-5 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">Apna Interview</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-5 py-2 rounded-lg cursor-pointer"
        >
          Logout
        </button>
      </div>
      <div className="p-10">
        <h2 className="text-3xl font-bold">Welcome</h2>
        <p className="text-gray-500 mt-2">AI Resume Analyzer Dashboard</p>
        <div className="grid grid-cols-4 gap-6 mt-10">
          <div className="bg-white rounded-xl shadow p-6">Resume Analyzer</div>
          <div className="bg-white rounded-xl shadow p-6">ATS Reports</div>
          <div className="bg-white rounded-xl shadow p-6">
            Interview Questions
          </div>
          <div className="bg-white rounded-xl shadow p-6">Profile</div>
        </div>
      </div>
    </main>
  );
}