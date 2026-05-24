import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(email, password);
      if (user.role === "admin") navigate("/admin/dashboard");
      else navigate("/user/dashboard");
    } catch {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* LEFT — exactly 50% white, login card centered inside */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white px-8 py-10">
        <div className="w-full max-w-[400px] flex flex-col">

          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-9 h-9 bg-[#1868DB] rounded-lg flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10.5L8 14.5L16 6.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-[#172B4D] font-bold text-xl tracking-tight">TaskFlow</span>
          </div>

          {/* Feature icons row */}
          <div className="flex items-center gap-4 mb-8">
            {[
              { emoji: "✅", label: "Tasks" },
              { emoji: "👥", label: "Teams" },
              { emoji: "📊", label: "Reports" },
              { emoji: "🎯", label: "Goals" },
              { emoji: "🔔", label: "Alerts" },
            ].map(({ emoji, label }) => (
              <div key={label} className="flex flex-col items-center gap-1.5">
                <div className="w-10 h-10 bg-[#F4F5F7] rounded-xl flex items-center justify-center text-lg border border-[#EBECF0]">
                  {emoji}
                </div>
                <span className="text-[10px] text-[#6B778C] font-medium">{label}</span>
              </div>
            ))}
          </div>

          {/* Headline */}
          <h1 className="text-[#172B4D] font-bold text-[28px] leading-[1.25] mb-7">
            Where your teams<br />get work done
          </h1>

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md p-3 mb-5">
              <AlertCircle size={15} className="shrink-0" />
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#172B4D] text-sm font-semibold">Work email</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B778C]">
                  <Mail size={16} />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full border border-[#DFE1E6] rounded-md py-3 pl-10 pr-4 text-sm text-[#172B4D] placeholder:text-[#A5ADBA] focus:outline-none focus:ring-2 focus:ring-[#1868DB] focus:border-[#1868DB] bg-white transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[#172B4D] text-sm font-semibold">Password</label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6B778C]">
                  <Lock size={16} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full border border-[#DFE1E6] rounded-md py-3 pl-10 pr-10 text-sm text-[#172B4D] placeholder:text-[#A5ADBA] focus:outline-none focus:ring-2 focus:ring-[#1868DB] focus:border-[#1868DB] bg-white transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#6B778C] hover:text-[#172B4D] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-[#DFE1E6] accent-[#1868DB] cursor-pointer"
                />
                <span className="text-sm text-[#172B4D]">Remember me</span>
              </label>
              <span className="text-sm text-[#1868DB] font-medium cursor-pointer hover:underline">
                Forgot password?
              </span>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1868DB] hover:bg-[#1158C7] text-white font-semibold py-3 rounded-md text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={15} /> Logging in...</>
              ) : (
                "Log in"
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-sm text-[#6B778C] mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#1868DB] font-semibold hover:underline">
              Sign up
            </Link>
          </p>

          {/* Footer */}
          <p className="text-[#6B778C] text-xs mt-10">
            © 2026 TaskFlow. Made with ❤️ by{" "}
            <span className="text-[#1868DB] font-medium">Netraj</span>
          </p>
        </div>
      </div>

      {/* RIGHT — exactly 50% blue-gray, preview card centered inside */}
      <div className="hidden md:flex w-1/2 bg-[#E8EDF5] items-center justify-center relative overflow-hidden">

        {/* Dot grid background */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: "radial-gradient(circle, #B0BAD0 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* App preview card */}
        <div className="relative z-10 w-[400px] bg-white rounded-2xl shadow-2xl border border-[#DFE1E6] overflow-hidden">

          {/* Card header */}
          <div className="px-5 pt-5 pb-4 border-b border-[#EBECF0]">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-[#1868DB] rounded flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10.5L8 14.5L16 6.5" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="text-[#172B4D] font-bold text-sm">The Next Big Thing</span>
            </div>
            <div className="flex items-center gap-5 text-xs text-[#6B778C] font-medium">
              {["Summary", "Board", "List", "Calendar", "Timeline"].map((tab) => (
                <span
                  key={tab}
                  className={
                    tab === "List"
                      ? "text-[#1868DB] border-b-2 border-[#1868DB] pb-1 -mb-[17px]"
                      : "cursor-pointer pb-1 hover:text-[#172B4D]"
                  }
                >
                  {tab}
                </span>
              ))}
            </div>
          </div>

          {/* Search + avatars */}
          <div className="px-5 py-3 flex items-center justify-between border-b border-[#EBECF0]">
            <div className="flex items-center gap-2 bg-[#F4F5F7] rounded px-3 py-1.5 text-xs text-[#6B778C] w-32">
              <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="#6B778C" strokeWidth="1.5"/>
                <path d="M11 11L14 14" stroke="#6B778C" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Search
            </div>
            <div className="flex items-center">
              {["#FF8B00", "#36B37E", "#6554C0", "#0065FF"].map((color, i) => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white -ml-1.5 first:ml-0" style={{ backgroundColor: color }} />
              ))}
              <div className="w-6 h-6 rounded-full border-2 border-white -ml-1.5 bg-[#DFE1E6] flex items-center justify-center text-[9px] text-[#6B778C] font-bold">+3</div>
            </div>
          </div>

          {/* Column headers */}
          <div className="px-5 py-2 grid grid-cols-[36px_46px_1fr_78px] gap-2 text-[10px] text-[#6B778C] font-semibold uppercase tracking-wide border-b border-[#EBECF0]">
            <span>Type</span><span>Priority</span><span>Name</span><span className="text-right">Status</span>
          </div>

          {/* Task rows */}
          {[
            { type: "bg-blue-500",   priority: "high",   status: "TO DO",       sc: "text-[#42526E] bg-[#DFE1E6]" },
            { type: "bg-purple-500", priority: "high",   status: "IN PROGRESS", sc: "text-[#0052CC] bg-[#DEEBFF]" },
            { type: "bg-blue-500",   priority: "low",    status: "DONE",        sc: "text-[#006644] bg-[#E3FCEF]" },
            { type: "bg-green-500",  priority: "high",   status: "TO DO",       sc: "text-[#42526E] bg-[#DFE1E6]" },
            { type: "bg-purple-500", priority: "medium", status: "IN PROGRESS", sc: "text-[#0052CC] bg-[#DEEBFF]" },
            { type: "bg-blue-500",   priority: "low",    status: "DONE",        sc: "text-[#006644] bg-[#E3FCEF]" },
          ].map((row, i) => (
            <div key={i} className="px-5 py-2.5 grid grid-cols-[36px_46px_1fr_78px] gap-2 items-center border-b border-[#EBECF0] last:border-0 hover:bg-[#FAFBFC]">
              <div className={`w-4 h-4 rounded ${row.type}`} />
              <div className="flex items-center">
                {row.priority === "high" && <svg width="14" height="14" viewBox="0 0 16 16" fill="#FF5630"><path d="M8 3L13 10H3L8 3Z"/><path d="M8 7L13 14H3L8 7Z" fillOpacity="0.4"/></svg>}
                {row.priority === "medium" && <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="2" y="5" width="12" height="2.5" rx="1" fill="#FF991F"/><rect x="2" y="9" width="12" height="2.5" rx="1" fill="#FF991F" fillOpacity="0.4"/></svg>}
                {row.priority === "low" && <svg width="14" height="14" viewBox="0 0 16 16" fill="#0065FF"><path d="M8 13L3 6H13L8 13Z" fillOpacity="0.4"/><path d="M8 9L3 2H13L8 9Z" fillOpacity="0.2"/></svg>}
              </div>
              <div className="h-2.5 bg-[#DFE1E6] rounded-full w-full max-w-[130px]" />
              <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${row.sc} text-right whitespace-nowrap`}>{row.status}</span>
            </div>
          ))}

          {/* Bottom indicator */}
          <div className="px-5 py-4 flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-9 h-9 rounded-full bg-[#FF8B00] border-2 border-white" />
              <div className="w-9 h-9 rounded-full bg-[#6554C0] border-2 border-white" />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <span className="bg-[#DEEBFF] text-[#0052CC] text-[10px] font-bold px-2.5 py-1.5 rounded">IN PROGRESS</span>
              <svg width="28" height="16" viewBox="0 0 28 16" fill="none">
                <path d="M2 8 Q10 2 18 8" stroke="#172B4D" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                <path d="M16 5L19 8L16 11" stroke="#172B4D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="bg-[#E3FCEF] text-[#006644] text-[10px] font-bold px-2.5 py-1.5 rounded">DONE</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;