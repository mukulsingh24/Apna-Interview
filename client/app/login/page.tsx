"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill all the fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    try {
      setLoading(true);
      console.log({
        email,
        password,
      });
      alert("Login Successfull");
    } catch (err: unknown) {
      console.log(err);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 flex items-center justify-center">
        <Image
          src="/assets/loginpage.png"
          alt="Login"
          width={700}
          height={700}
          className="w-[80%] h-auto"
          priority
        />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-125 bg-white rounded-xl shadow-sm p-10">
          <h1 className="text-4xl font-bold leading-tight mb-8 text-black">
            Welcome to <br />
            <span className="text-blue-500">Apna Interview</span>
          </h1>
          <button className="w-full flex items-center justify-center gap-3 border rounded-lg px-6 py-4 bg-white shadow-sm hover:bg-gray-100 transition">
            <FcGoogle size={24} />
            <span className="text-black font-medium">Login with Google</span>
          </button>
          <div className="flex items-center gap-4 my-8 w-full">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-4 mb-4 outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <div className="relative mb-2">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-4 pl-4 pr-14 outline-none focus:ring-2 focus:ring-blue-400 text-black"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
            </button>
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input type="checkbox" className="w-4 h-4" />
              Remember me
            </label>
            <Link
              href="/forgot"
              className="text-blue-500 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-4 rounded-lg font-semibold transition"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-center text-sm text-gray-600 mt-8">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-500 font-medium hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
