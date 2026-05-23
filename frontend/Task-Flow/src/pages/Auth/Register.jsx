import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, User, Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
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
    <div className="min-h-screen bg-[#E8EEFF] flex flex-col">

      {/* Top navbar */}
      <div className="px-10 py-5 flex items-center">
        <div className="flex items-center gap-2">
          <div className="bg-[#0052CC] rounded-lg p-1.5">
            <Zap className="text-white" size={18} fill="currentColor" />
          </div>
          <span className="text-[#172B4D] font-bold text-lg tracking-tight">TaskFlow</span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 items-center px-10 md:px-20 gap-16">

        {/* LEFT — Form side */}
        <div className="w-full max-w-sm flex flex-col">

          <div className="flex items-center gap-6 mb-10">
            {[
              { icon: "⚡", label: "Tasks" },
              { icon: "👥", label: "Teams" },
              { icon: "📊", label: "Reports" },
              { icon: "🎯", label: "Goals" },
              { icon: "🔔", label: "Alerts" },
            ].map(({ icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-lg shadow-sm group-hover:shadow-md transition-shadow">
                  {icon}
                </div>
                <span className="text-xs text-[#6B778C]">{label}</span>
              </div>
            ))}
          </div>

          <h1 className="text-[#172B4D] font-bold text-4xl leading-tight mb-6">
            Start managing smarter today
          </h1>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 text-sm rounded-lg p-3 mb-4">
              <AlertCircle size={15} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="relative">
              <User className="absolute left-3 top-3 text-[#6B778C]" size={16} />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="w-full bg-white border border-gray-300 rounded-lg py-3 pl-9 pr-3 text-sm text-[#172B4D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent shadow-sm"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-3 top-3 text-[#6B778C]" size={16} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Work email"
                className="w-full bg-white border border-gray-300 rounded-lg py-3 pl-9 pr-3 text-sm text-[#172B4D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent shadow-sm"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-[#6B778C]" size={16} />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (min 6 characters)"
                className="w-full bg-white border border-gray-300 rounded-lg py-3 pl-9 pr-10 text-sm text-[#172B4D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent shadow-sm"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-[#6B778C] hover:text-[#172B4D]">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-[#6B778C]" size={16} />
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm password"
                className="w-full bg-white border border-gray-300 rounded-lg py-3 pl-9 pr-10 text-sm text-[#172B4D] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0052CC] focus:border-transparent shadow-sm"
              />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-3 text-[#6B778C] hover:text-[#172B4D]">
                {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-[#0052CC] hover:bg-[#0065FF] text-white font-semibold py-3 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-sm"
            >
              {submitting
                ? <><Loader2 className="animate-spin" size={15} /> Creating account...</>
                : "Sign up"
              }
            </button>
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-xs text-[#6B778C]">Or continue with</span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          <div className="flex gap-3">
            <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2.5 text-sm text-[#172B4D] font-medium hover:bg-gray-50 transition-colors shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-white border border-gray-300 rounded-lg py-2.5 text-sm text-[#172B4D] font-medium hover:bg-gray-50 transition-colors shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#00A4EF">
                <path d="M11.5 2h-9A.5.5 0 002 2.5v9a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zM11.5 12.5h-9a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zM21.5 2h-9a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5zM21.5 12.5h-9a.5.5 0 00-.5.5v9a.5.5 0 00.5.5h9a.5.5 0 00.5-.5v-9a.5.5 0 00-.5-.5z"/>
              </svg>
              Microsoft
            </button>
          </div>

          <p className="text-xs text-[#6B778C] mt-4 leading-relaxed">
            By signing up, you agree to our{" "}
            <span className="text-[#0052CC] cursor-pointer hover:underline">Privacy Policy</span>{" "}
            and{" "}
            <span className="text-[#0052CC] cursor-pointer hover:underline">Terms of Service</span>.
          </p>

          <p className="text-sm text-[#6B778C] mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-[#0052CC] font-semibold hover:underline">
              Log in
            </Link>
          </p>

          <div className="flex items-center gap-6 mt-10 opacity-50">
            {["CISCO", "Ford", "PayPal", "NASA"].map((name) => (
              <span key={name} className="text-xs font-bold text-[#172B4D] tracking-wide">{name}</span>
            ))}
          </div>

          <p className="text-[#6B778C] text-xs mt-6">
            © 2026 TaskFlow. Made with ❤️ by{" "}
            <span className="text-[#0052CC] font-medium">Netraj</span>
          </p>
        </div>

        {/* RIGHT — App preview */}
        <div className="hidden md:flex flex-1 items-center justify-center">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-gray-700 px-4 py-2 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="p-6 bg-white">
              <h3 className="text-xl font-bold text-gray-800 mb-1">Task Management</h3>
              <p className="text-gray-400 text-xs mb-4">This week</p>
              <div className="flex gap-3">
                {[
                  { label: "Pending", color: "bg-purple-500", tasks: ["Design homepage", "Write blog post"] },
                  { label: "In Progress", color: "bg-yellow-500", tasks: ["Build API", "Fix payment bug"] },
                  { label: "In Review", color: "bg-pink-500", tasks: ["Code review", "QA testing"] },
                  { label: "Done", color: "bg-green-500", tasks: ["Setup DB", "Deploy app"] },
                ].map(({ label, color, tasks }) => (
                  <div key={label} className="flex-1">
                    <div className={`${color} text-white text-xs font-semibold px-3 py-2 rounded-lg mb-2`}>
                      {label}
                    </div>
                    {tasks.map((task) => (
                      <div key={task} className="bg-white border border-gray-200 rounded-lg p-2.5 mb-2 shadow-sm">
                        <p className="text-xs text-gray-700 font-medium">{task}</p>
                        <div className="flex gap-1 mt-1.5">
                          <span className="bg-blue-100 text-blue-600 text-[10px] px-1.5 py-0.5 rounded">Medium</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;