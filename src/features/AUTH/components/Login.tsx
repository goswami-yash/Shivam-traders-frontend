import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login } from "@/features/AUTH/services/AuthService"; // adjust path
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const navigate = useNavigate();

  const [showPass, setShowPass] = useState(false);
  const [form, setForm] = useState({
    mobile_no: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { loginUser } = useAuth();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit handler
  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!form.mobile_no || !form.password) {
      return setError("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await login({
        mobile_no: form.mobile_no,
        password: form.password,
      });
      loginUser(res.result);
      // Redirect after login
      navigate("/");

    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-100 dark:bg-slate-950 transition-colors">
      
      {/* LEFT SIDE */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 text-white p-16 flex-col justify-between">
      <div className="flex flex-col justify-center h-full">
  <h1 className="text-4xl font-bold">
    Shivam Traders
  </h1>

  <div className="mt-16">
  <h2 className="text-6xl font-extrabold leading-tight">
  Smart Trading
  <br />
  Made Simple
</h2>

<p className="mt-6 text-xl text-blue-100 max-w-lg leading-relaxed">
  Manage your business, track orders,
  inventory, suppliers and sales
  from one powerful dashboard.
</p>
          </div>
        </div>

        <div className="text-sm text-blue-200">
          © 2026 Shivam Traders
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6 bg-slate-50 dark:bg-slate-950">
        
      <div className=" w-full max-w-md bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-2xl border  border-slate-200 dark:border-slate-700 ">
          
          {/* HEADER */}
          <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
  Welcome Back
</h2>

<p className="text-slate-500 dark:text-slate-400 mt-2">
  Login to continue
</p>
          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-4 text-sm text-red-500 text-center">
              {error}
            </div>
          )}

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Mobile */}
            <div>
              <label className="text-sm text-gray-600">
                Mobile Number
              </label>
              <input
                name="mobile_no"
                type="text"
                value={form.mobile_no}
                onChange={handleChange}
                placeholder="Enter mobile number"
                className=" w-full px-4 py-3 border border-slate-300 dark:border-slate-700 rounded-lg
bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <div className="flex justify-between items-center">
                <label className="text-sm text-gray-600">
                  Password
                </label>
                <span className="text-xs text-blue-600 cursor-pointer hover:underline">
                  Forgot Password?
                </span>
              </div>

              <div className="relative mt-1">
                <input
                  name="password"
                  type={showPass ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  className="absolute right-3 top-2.5 text-gray-500"
                >
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="grow border-t"></div>
            <span className="mx-2 text-gray-400 text-sm">OR</span>
            <div className="grow border-t"></div>
          </div>

          {/* Google Login */}
          <button className="w-full border py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}