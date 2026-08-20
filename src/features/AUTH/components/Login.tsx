import React, { useState } from "react";
import { Eye, EyeOff, Lock, Phone, ArrowRight, Loader2 } from "lucide-react";
import { login } from "@/features/AUTH/services/AuthService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function LoginPage() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setUser } = useAuth();

  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    mobile_no: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.mobile_no || !form.password) {
      return setError("Please fill in all required fields.");
    }

    try {
      setLoading(true);

      const res = await login({
        mobile_no: form.mobile_no,
        password: form.password,
      });

      // Checked for both spelling variations ('success' and 'sucess')
      if (res?.success || res?.sucess) {
        const userData = res.result || res.data;

        localStorage.setItem(
          "auth",
          JSON.stringify({ isAuthenticated: true, user: userData })
        );

        setIsAuthenticated(true);
        setUser(userData);
        toast.success("Welcome back!");
        navigate("/");
      } else {
        setError(res?.message || "Invalid credentials. Please try again.");
      }
    } catch (err: any) {
      setError(err?.message || err?.response?.data?.message || "Login failed. Connection error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#F5FBDA] dark:bg-[#120311] transition-colors duration-300">
      {/* LEFT SIDE BRANDING PANEL */}
      <div className="hidden lg:flex w-1/2 bg-[#450C3F] text-[#F5FBDA] p-16 flex-col justify-between relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#B9D175]/20 rounded-full blur-3xl" />
        <div className="absolute -left-20 -top-20 w-96 h-96 bg-[#D9EFBD]/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <span className="bg-[#B9D175] text-[#450C3F] font-black text-xl px-3 py-1 rounded-xl">
              ST
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-[#F5FBDA]">
              Shivam Traders
            </h1>
          </div>

          <div className="mt-24">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl font-extrabold leading-tight"
            >
              Smart Trading <br />
              <span className="text-[#B9D175]">Made Simple.</span>
            </motion.h2>

            <p className="mt-6 text-lg text-[#D9EFBD]/80 max-w-lg leading-relaxed">
              Manage your inventory, track customer orders, evaluate sales performance, and optimize business processes in real time.
            </p>
          </div>
        </div>

        <div className="relative z-10 text-sm text-[#D9EFBD]/60">
          © {new Date().getFullYear()} Shivam Traders. All rights reserved.
        </div>
      </div>

      {/* RIGHT SIDE FORM PANEL */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-white dark:bg-[#2A0727] p-8 sm:p-10 rounded-3xl shadow-xl border border-[#D9EFBD] dark:border-[#450C3F]"
        >
          {/* HEADER */}
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-[#450C3F] dark:text-[#B9D175] tracking-tight">
              Welcome Back
            </h2>
            <p className="text-sm text-slate-500 dark:text-[#D9EFBD]/70 mt-2">
              Sign in to manage your trading dashboard
            </p>
          </div>

          {/* ERROR ALERT */}
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-sm text-center font-medium"
            >
              {error}
            </motion.div>
          )}

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Mobile Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#450C3F]/80 dark:text-[#D9EFBD] mb-2">
                Mobile Number
              </label>
              <div className="relative">
                <Phone size={18} className="absolute left-3.5 top-3.5 text-slate-400 dark:text-[#D9EFBD]/50" />
                <input
                  name="mobile_no"
                  type="text"
                  value={form.mobile_no}
                  onChange={handleChange}
                  placeholder="Enter registered mobile number"
                  className="w-full pl-11 pr-4 py-3 bg-white dark:bg-[#1C051A] border border-[#D9EFBD] dark:border-[#450C3F] text-[#450C3F] dark:text-[#F5FBDA] rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#B9D175] transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#450C3F]/80 dark:text-[#D9EFBD]">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold text-[#450C3F] dark:text-[#B9D175] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-3.5 text-slate-400 dark:text-[#D9EFBD]/50" />
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full pl-11 pr-11 py-3 bg-white dark:bg-[#1C051A] border border-[#D9EFBD] dark:border-[#450C3F] text-[#450C3F] dark:text-[#F5FBDA] rounded-xl text-sm font-medium outline-none focus:ring-2 focus:ring-[#B9D175] transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3.5 top-3.5 text-slate-400 dark:text-[#D9EFBD]/50 hover:text-[#450C3F] dark:hover:text-[#F5FBDA]"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B9D175] hover:bg-[#a6bf60] text-[#450C3F] py-3.5 rounded-xl font-bold tracking-wide transition shadow-md flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center my-6">
            <div className="grow border-t border-[#D9EFBD] dark:border-[#450C3F]" />
            <span className="mx-3 text-xs font-bold text-slate-400 dark:text-[#D9EFBD]/50 uppercase">
              OR
            </span>
            <div className="grow border-t border-[#D9EFBD] dark:border-[#450C3F]" />
          </div>

          {/* THIRD PARTY AUTH */}
          <button
            type="button"
            className="w-full border border-[#D9EFBD] dark:border-[#450C3F] bg-white dark:bg-[#1C051A] text-[#450C3F] dark:text-[#F5FBDA] py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-3 hover:bg-[#F5FBDA]/50 dark:hover:bg-[#450C3F]/40 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </motion.div>
      </div>
    </div>
  );
}