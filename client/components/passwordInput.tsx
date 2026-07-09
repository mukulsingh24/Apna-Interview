"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
type PasswordInputProps = {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
};
export default function PasswordInput({
  placeholder,
  value,
  onChange,
  showPassword,
  setShowPassword,
}: PasswordInputProps) {
  return (
    <div className="relative mb-4">
      <input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-gray-300 rounded-lg py-4 pl-4 pr-14 outline-none focus:ring-2 focus:ring-blue-400 text-black"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute inset-y-0 right-4 flex items-center text-gray-500 hover:text-gray-700"
      >
        {showPassword ? (
          <FaEyeSlash size={18}/>
        ) : (
          <FaEye size={18}/>
        )}
      </button>
    </div>
  );
}