import React, { useState } from "react";
import { BrainCircuit, Mail, Lock, ArrowRight , User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import authservice from "../../services/authservice";
import toast from "react-hot-toast";

const Registerpage = () => {
  const [loading, setLoading] = useState(false);
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
    const [username, setusername] = useState("");
  const [focusedfield, setfocusedfield] = useState(null);
  const [error, seterror] = useState("");

  const navigate = useNavigate();
  const handlesubmit = async(e)=>{
e.preventDefault()

if(password.length<6){
  seterror("Password must be atleast 6 characters long")
  return 
}
setLoading(true)
seterror("")
  try {
  await authservice.register(username , email, password); //  yeh frontend se axios ki help se req bhejne ke liye function h 
      toast.success("Registered successfully . Please Login");
      navigate("/login");
    } catch (error) {
      seterror(error.message || "Failed to Register .Please check your credentials");
      toast.error(error.message || "Failed to Register");
    } finally {
      setLoading(false);
    }

  }
  return (
     <div className="relative flex items-center justify-center min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
   
        
         <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [bg-size:16px_16px] opacity-30 pointer-events-none"></div>
   
         {/* Card */}
         <div className="relative w-full max-w-md px-6">
           <div className="bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-10">
             {/* Header */}
             <div className="text-center mb-5">
               <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-primary to-primary-dark shadow-lg shadow-color- mb-6">
                 <BrainCircuit className="w-7 h-7 text-white" strokeWidth={2} />
               </div>
   
               <h1 className="text-2xl font-medium text-primary-dark tracking-tight mb-2">
                Create an account
               </h1>
               <p className="text-slate-800 text-sm">
                Start your AI-powered learning experience
               </p>
             </div>


    

    
  

          <div className="space-y-5">
   {/* USERNAME */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-primary-dark uppercase tracking-wide">
                Username
              </label>

              <div className="relative group">
                <div
                  className={`absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors duration-200 ${
                    focusedfield === "email"
                      ? "text-primary-dark"
                      : "text-primary"
                  }`}
                >
                  <User className="h-5 w-5" strokeWidth={2} />
                </div>

                <input
                  type="username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  onFocus={() => setfocusedfield("email")}
                  onBlur={() => setfocusedfield(null)}
                  className="w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-primary focus:bg-white focus:shadow-lg focus:shadow-primary-dark/10"
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>



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
              onClick={handlesubmit}
              className="group relative w-full h-12 bg-linear-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary active:scale-[0.98] text-white text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 shadow-lg shadow-primary/25 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2.5} />
                  </>
                )}
              </span>

              <div className="absolute inset-0 bg-linear-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
            </button>
          </div>

       
        

   

     <div className="mt-8 pt-6 border-t border-slate-200/60">
               <p className="text-center text-sm text-slate-800">
                 Already have an account?{" "}
                 <Link
                   to="/login"
                   className="font-semibold text-primary hover:primary-dark transition-colors"
                 >
                   Sign in
                 </Link>
               </p>
             </div>
            
   
             {/* Footer */}
        
           </div>
      
           <p className="text-center text-xs text-slate-600 mt-2">
             By continuing, you agree to our Terms & Privacy Policy
           </p>
       
         </div>
       </div>
  )
}

export default Registerpage