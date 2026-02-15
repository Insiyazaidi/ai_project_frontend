import React, { useState } from "react";
import { BrainCircuit, Mail, Lock, ArrowRight } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/Authcontext";
import authservice from "../../services/authservice";
import toast from "react-hot-toast";

const Loginpage = () => {
  const [loading, setLoading] = useState(false);
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [focusedfield, setfocusedfield] = useState(null);
  const [error, seterror] = useState("");

  const navigate = useNavigate();
  const { login } = useAuth();

  const handlesubmit = async (e) => {
    e.preventDefault();
    seterror("");
    setLoading(true);

    try {
      const { token, user } = await authservice.login(email, password); //  yeh frontend se axios ki help se req bhejne ke liye function h 
      login(user, token);  // yeh auth context vla login  h jo token aur user ka data save krega 
      toast.success("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      seterror(error.message || "Failed to login. Please check credentials");
      toast.error(error.message || "Failed to login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">

     
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [bg-size:16px_16px] opacity-30 pointer-events-none"></div>

      {/* Card */}
      <div className="relative w-full max-w-md px-6">
        <form
          onSubmit={handlesubmit}
          className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-10"
        >
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-primary-dark shadow-lg shadow-color- mb-6">
              <BrainCircuit className="w-7 h-7 text-white" strokeWidth={2} />
            </div>

            <h1 className="text-2xl font-medium text-primary-dark tracking-tight mb-2">
              Welcome back
            </h1>
            <p className="text-slate-800 text-sm">
              Sign in to continue your journey
            </p>
          </div>

          <div className="space-y-5">
            {/* EMAIL */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-primary-dark uppercase tracking-wide">
                Email
              </label>

              <div className="relative group">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                    focusedfield === "email"
                      ? "text-primary-dark"
                      : "text-primary"
                  }`}
                >
                  <Mail className="h-5 w-5" strokeWidth={2} />
                </div>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  onFocus={() => setfocusedfield("email")}
                  onBlur={() => setfocusedfield(null)}
                  className="w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary-dark/10"
                  placeholder="Enter your email id"
                  required
                />
              </div>
            </div>




            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-primary-dark uppercase tracking-wide">
                Password
              </label>

              <div className="relative group">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                    focusedfield === "password"
                      ? "text-primary-dark"
                      : "text-primary"
                  }`}
                >
                  <Lock className="h-5 w-5" strokeWidth={2} />
                </div>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  onFocus={() => setfocusedfield("password")}
                  onBlur={() => setfocusedfield(null)}
                  className="w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary-dark/10"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* ERROR */}
            {error && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                <p className="text-xs text-red-400 font-medium text-center">
                  {error}
                </p>
              </div>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full h-12 bg-linear-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-primary/25 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
                  </>
                )}
              </span>

              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200/60">
            <p className="text-center text-sm text-slate-800">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-primary hover:primary-dark transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>

        <p className="text-center text-xs text-slate-600 mt-6">
          By continuing, you agree to our Terms & Privacy Policy
        </p>
    
      </div>
    </div>
  );
};

export default Loginpage;
