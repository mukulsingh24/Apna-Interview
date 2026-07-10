"use client";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import PasswordInput from "@/components/passwordInput";
import { useRouter } from "next/navigation";
export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const passwordLength = password.length >= 8;
  const passwordsMatch = password === confirmPassword || confirmPassword === "";
  const router = useRouter();
  const handleGoogleSignup = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Google signup failed.");
    }
  };
  const handleRegister = async () => {
    setError("");
    if (!username || !email || !password || !confirmPassword) {
      setError("Please fill all the fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      console.log(userCredential.user);
      router.push("/login");
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
          alt="Register"
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
          <button
            onClick={handleGoogleSignup}
            className="cursor-pointer w-full flex items-center justify-center gap-3 border rounded-lg px-6 py-4 bg-white shadow-sm hover:bg-gray-100 transition"
          >
            <FcGoogle size={24} />
            <span className="text-black font-medium">Signup with Google</span>
          </button>
          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-4 mb-4 outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-4 mb-4 outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <PasswordInput
            placeholder="Enter Password"
            value={password}
            onChange={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />

          {password && (
            <p
              className={`text-sm mb-4 ${
                passwordLength ? "text-green-600" : "text-red-500"
              }`}
            >
              {passwordLength
                ? "Password length is valid."
                : "Password must contain at least 8 characters."}
            </p>
          )}
          <PasswordInput
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            showPassword={showConfirmPassword}
            setShowPassword={setShowConfirmPassword}
          />
          {confirmPassword && (
            <p
              className={`text-sm mb-4 ${
                passwordsMatch ? "text-green-600" : "text-red-500"
              }`}
            >
              {passwordsMatch ? "Passwords match." : "Passwords do not match."}
            </p>
          )}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleRegister}
            disabled={loading}
            className="cursor-pointer w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-semibold transition disabled:bg-blue-300"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-500 font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
