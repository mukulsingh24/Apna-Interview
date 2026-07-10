"use client";
import Link from "next/link";
import { auth } from "../firebase/firebase";
import Image from "next/image";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const handleForgot = async () => {
    setError("");
    if (!email) {
      setError("Email field Cannot be Empty");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      console.error(err);
      setError("Failed to send reset link.");
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 flex items-center justify-center">
        <Image
          src="/assets/loginpage.png"
          alt="Forgot Password"
          width={700}
          height={700}
          className="w-[80%] h-auto"
          priority
        />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-125 bg-white rounded-xl shadow-sm p-10">
          <h1 className="text-4xl font-bold leading-tight mb-3 text-black">
            Forgot Your
            <br />
            <span className="text-blue-500">Password?</span>
          </h1>
          <p className="text-gray-500 mb-8">
            No worries! Enter your registered email address and we&apos;ll send
            you a password reset link.
          </p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-4 mb-6 outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleForgot}
            className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-semibold transition"
          >
            Send Reset Link
          </button>
          <div className="text-center mt-8">
            <Link
              href="/login"
              className="text-blue-500 font-medium hover:underline"
            >
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
