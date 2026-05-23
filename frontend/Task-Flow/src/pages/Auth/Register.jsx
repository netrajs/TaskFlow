import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, User, Mail, Lock, Eye, EyeOff, AlertCircle, ShieldCheck, Users, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password || !confirmPassword)
      return setError("All fields are required");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      return setError("Please enter a valid email address");
    if (password.length < 6)
      return setError("Password must be at least 6 characters");
    if (password !== confirmPassword)
      return setError("Passwords do not match");
    setSubmitting(true);
    try {
      const user = await register(name, email, password);
      if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/user/dashboard");
    } catch {
      setError("Registration failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F5F7] flex flex-col items-center justify-center p-4">

      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="bg-[#0052CC] rounded-lg p-1.5">
          <Zap className="text-white" size={20} fill="currentColor" />
        </div>
        <span className="text-[#172B4D] font-bold text-xl tracking-tight">TaskFlow</span>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-sm p-8">

        <h1 className="text-[#172B4D] font-semibold text-xl text-center mb-1">
          Create your account
        </h1>
        <p className="text-[#6B778C] text-sm text-center mb-6">
          Sign up to get started with TaskFlow
        </p>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg p-3 mb-5">
            <AlertCircle size={15} className="shrink-0 text-red-500" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#172B4D] mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 text-[#6B778C]" size={16} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-lg py-2.5 pl-9 pr-3 text-sm text-[#172B4D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent bg-[#FAFAFA]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#172B4D] mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-2.5 text-[#6B778C]" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg py-2.5 pl-9 pr-3 text-sm text-[#172B4D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent bg-[#FAFAFA]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#172B4D] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-[#6B778C]" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 6 characters"
                className="w-full border border-gray-300 rounded-lg py-2.5 pl-9 pr-10 text-sm text-[#172B4D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent bg-[#FAFAFA]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-[#6B778C] hover:text-[#172B4D]"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#172B4D] mb-1.5">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 text-[#6B778C]" size={16} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat your password"
                className="w-full border border-gray-300 rounded-lg py-2.5 pl-9 pr-10 text-sm text-[#172B4D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent bg-[#FAFAFA]"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-[#6B778C] hover:text-[#172B4D]"
              >
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-[#0052CC] hover:bg-[#0065FF] text-white font-semibold py-2.5 rounded-lg text-sm transition-colors mt-2 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {submitting ? (
              <><Loader2 className="animate-spin" size={15} /> Creating account...</>
            ) : "Sign Up"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <p className="text-center text-sm text-[#6B778C]">
          Already have an account?{" "}
          <Link to="/login" className="text-[#0052CC] font-semibold hover:underline">
            Log in
          </Link>
        </p>
      </div>

      {/* Trust badges */}
      <div className="flex items-center gap-6 mt-6">
        <div className="flex items-center gap-1.5 text-xs text-[#6B778C]">
          <ShieldCheck size={13} className="text-green-500" /> Secure
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#6B778C]">
          <Zap size={13} className="text-[#0052CC]" /> Fast
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[#6B778C]">
          <Users size={13} className="text-purple-500" /> Collaborative
        </div>
      </div>

      <p className="text-center text-[#6B778C] text-xs mt-4">
        © 2026 TaskFlow. Made with ❤️ by{" "}
        <span className="text-[#0052CC] font-medium">Netraj</span>
      </p>
    </div>
  );
};

export default Register;