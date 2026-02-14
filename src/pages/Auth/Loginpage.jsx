import React, { useState } from 'react'
import {BrainCircuit , Mail , Lock , ArrowRight} from "lucide-react"
const Loginpage = () => {
  const [loading , setLoading] = useState(false)
  const [password , setpassword]= useState("123454321")
  const [email , setemail] = useState("zaidiinsiya83@gmail.com")
  const [focusedfield , setfocusedfield] = useState(null)
  const [error , seterror] = useState("")
 
  return(
    <div className='flex items-center justify-center min-h-screen bg-linear from-slate-50 via-white to-slate-100'>
      <div className=' absolute insert-0 bg-[radial-gradient(#e5e7eb_1px, transparent_1px)] bg-size-[16px_16px] opacity-30'>
        <div className='relative w-full max-w-md px-6'>
          <div className='bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/50 p-10'>

            <div className='text-center mb-10'>
              <div className='inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-linear-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/25 mb-6'>
                <BrainCircuit className='w-7 h-7 text-white' strokeWidth={2}/>
              </div>
              <h1 className='text-2xl font-medium text-slate-900 tracking-tight mb-2'>Welcome back</h1>
              <p className='
              text-slate-500 text-sm'>Sign in to continue your journey</p>
            </div>

            <div className='space-y-5'>
<div className='space-y-2'>
  <label className='block text-xs font-semibold text-slate-700 uppercase tracking-wide'>Email</label>
  <div className='relative group'>
    <div className={`absolute insert-y-0 left-0 pl-4 flex flex-items-center pointer-events-none transition-colors duration-200 ${focusedfield ==="email"? "text-emerald-500": "text-slate-400"}`}>
<Mail className='h-5 w-5' strokeWidth={2}/>
    </div>
    <input type='email' value={email} onChange={(e)=>setemail(e.target.value)} onFocus={()=>setfocusedfield("email")} onBlur={()=>setfocusedfield(null)} className='w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none  focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500' placeholder="Enter your email id"></input>

  </div>
</div>


<div className='space-y-2'>
  <label className='block text-xs font-semibold text-slate-700 uppercase tracking-wide'>Password</label>
  <div className='relative group'>
    <div className={`absolute insert-y-0 left-0 pl-4 flex flex-items-center pointer-events-none transition-colors duration-200 ${focusedfield ==="password"? "text-emerald-500": "text-slate-400"}`}
    
    ><Lock className='h-5 w-5' strokeWidth={2}/> </div>
 <input type='password' value={password} onChange={(e)=>setpassword(e.target.value)} onFocus={()=>setfocusedfield("password")} onBlur={()=>setfocusedfield(null)} className='w-full h-12 pl-12 pr-4 border-2 border-slate-200 rounded-xl bg-slate-50/50 text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:outline-none  focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500' placeholder="Enter your password" ></input>
 
  </div>
</div>


{error && (
  <div className='rounded-lg bg-red border-red-200 p-3'>
    <p>{error}</p>
  </div>
)}
<button onClick={handlesubmit} disabled={loading}><span>{loading ? (
 <>
 <div className=''>Signing in ...</div>
 </>
): <>
Sign in <ArrowRight className='' strokeWidth={2.5}/>
</>}
</span>
<div></div>

</button>
</div>

<div>
  <p>Don't have an account? {" "}<Link to = "/register">Sign up</Link></p>
</div>
          </div>

          <p>By continuing , you agree to our Terms & Privacy Policy</p>
        </div>
      </div>
    </div>
  )
}

export default Loginpage