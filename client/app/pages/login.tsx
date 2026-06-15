import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/2 flex items-center justify-center">
        <img
          src="/assets/loginpage.png"
          alt="LoginPage"
          className="w-[80%] max-w-[700px] object-contain"
        />
      </div>
      <div className="w-1/2 flex items-center justify-center">
        <div className="w-full max-w-[500px] bg-white rounded-xl shadow-sm p-10">
          <h1 className="text-4xl font-bold leading-tight mb-8 text-black">
            Welcome to <br />
            <span className="text-blue-500">
              Apna Interview
            </span>
          </h1>
          <button className="w-full flex items-center justify-center gap-3 border rounded-lg px-6 py-4 bg-white shadow-sm hover:bg-gray-100 transition">
            <FcGoogle size={24} />
            <span className="text-black font-medium">
              Login with Google
            </span>
          </button>
          <div className="flex items-center gap-4 my-8 w-full">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-sm font-medium">
              OR
            </span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border border-gray-300 rounded-lg px-4 py-4 mb-4 outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-4 mb-4 outline-none focus:ring-2 focus:ring-blue-400 text-black"
          />
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="checkbox"
                className="w-4 h-4"
              />
              Remember me
            </label>
            <Link
              href="/forgot-password"
              className="text-blue-500 text-sm hover:underline"
            >
              Forgot Password?
            </Link>
          </div>
          <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-lg font-semibold transition">
            Login
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
