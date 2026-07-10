import Link from "next/link";
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <h1 className="text-5xl font-bold">Apna Interview</h1>
      <p className="text-gray-600">
        AI Resume Analyzer & Interview Preparation Platform
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded-lg"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="cursor-pointer border px-6 py-3 rounded-lg"
        >
          Register
        </Link>
      </div>
    </main>
  );
}
