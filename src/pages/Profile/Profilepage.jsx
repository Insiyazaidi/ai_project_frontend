import React, { useEffect, useState } from 'react'

import toast from 'react-hot-toast'
import  {User , Mail , Lock} from "lucide-react"
import Pageheader from '../../components/common/Pageheader'
import Button from '../../components/common/Button'
import authservice from '../../services/authservice'
import Applayout from '../../components/layout/Applayout'
const Profilepage = () => {
  const [loading , setloading]=useState(true)
  const [passwordloading , setpasswordloading] = useState(false)
  const [username , setusername] = useState("")
    const [email , setemail] = useState("")
      const [currentpass , setcurrentpass] = useState("")
    const [newpass , setnewpass] = useState("")
    const [confirmnewpassword , setconfirmnewpassword] = useState("")
    
    useEffect(()=>{
   
         const fetchprofile = async()=>{

   try {

        const {data} = await authservice.getprofile()
        console.log(data)
        setusername(data.username)
        setemail(data.email)
      
   }
       catch (error) {
        toast.error("failed to fetch profile data")
        console.error(error)
      }
      finally{
        setloading(false)
      }
    }

    fetchprofile()
    } , [])


const handlechangepassword = async(e)=>{
  e.preventDefault()
  if(newpass !==confirmnewpassword){
    toast.error("New passwords do not match")
    return
  }
  if(newpass<6){
    toast.error("New password must be at least 6 characters long")
    return
  }
  setpasswordloading(true)
  try {
   const response =  await authservice.changepassword({currentpass , newpass})
   console.log(response)
    toast.success("Password changed successfully")
    setcurrentpass("")
    setconfirmnewpassword("")
    setnewpass("")
  } catch (error) {
    toast.error(error.message || "Failed to change password")
  }
  finally{
    setpasswordloading(false)
  }
}


  return (
    <Applayout>

 <div>
      <Pageheader title="Profile Settings"/>
      <div className='space-y-8 '>

<div className='bg-white border border-neutral-200 rounded-lg p-6'>
  <h3 className='text-lg font-semibold text-neutral-900 mb-4'>User Information</h3>
  <div className='space-y-4'>
    <div className=''>
      <label className='block text-xs font-medium text-neutral-700 mb-1.5 '>Username</label>
      <div className='relative'>
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none '><User className='h-4 w-4 text-neutral-400'/></div>
        <p className='w-full h-9 pl-9 pr-3 pt-2 border border-neutral-200 rounded-lg bg-neutral-50 text-sm text-neutral-900'>{username}</p>
      </div>
    </div>
  </div>

<label className='block text-xs  font-medium text-neutral-700  mt-1.5 '>Email Address</label>
<div className='relative'>
  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
     <Mail className='h-4 w-4 text-neutral-400'/>
  
    </div>
     <p className='w-full h-9 pl-9 pr-3 pt-2 border border-neutral-200 rounded-lg bg-neutral-50 text-sm text-neutral-900 '>{email}</p> 
</div>
</div>
    </div>

{/*  Change password form*/}

<div className='bg-white border border-neutral-200 rounded-lg p-6'>
  <h3 className='text-lg font-semibold text-neutral-900 mb-4'>Change Password</h3>
  <form onSubmit={handlechangepassword} className='space-y-4'>

<div>


  <label className='block text-xs font-medium text-neutral-700 mb-1.5'>Current Password</label>
  <div className='relative'>
    <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
      <Lock className='h-4 w-4 text-neutral-400'/>
    </div>
 <input type='password'value={currentpass} onChange={(e)=>setcurrentpass(e.target.value)} required className='w-full h-9 pl-9 pr-3 border-neutral-200 rounded-lg bg-slate-100 text-lg text-neutral-900 placeholder-neutral-400 tansition-colors duration-150 focus:ring-2 focus:ring-primary-dark focus:border-transparent '></input>
  </div>
</div>

<div>

<label className='block text-xs font-medium text-neutral-700 mb-1.5'>New Password</label>
<div className='relative'>
  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
    <Lock className='h-4 w-4 text-neutral-400'/>
  </div>
  <input className='w-full h-9 pl-9 pr-3 border-neutral-200 rounded-lg bg-slate-100 text-lg text-neutral-900 placeholder-neutral-400 tansition-colors duration-150 focus:ring-2 focus:ring-primary-dark focus:border-transparent' onChange={(e)=>setnewpass(e.target.value)} value={newpass} type="password"/>
</div>
</div>


<div>

<label className='block text-xs font-medium text-neutral-700 mb-1.5'> Confirm New Password</label>
<div className='relative'>
  <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
    <Lock className='h-4 w-4 text-neutral-400'/>
  </div>
  <input className='w-full h-9 pl-9 pr-3 border-neutral-200 rounded-lg bg-slate-100 text-lg text-neutral-900 placeholder-neutral-400 tansition-colors duration-150 focus:ring-2 focus:ring-primary-dark focus:border-transparent' onChange={(e)=>setconfirmnewpassword(e.target.value)} value={confirmnewpassword} type="password"/>
</div>
</div>

<div className='flex items-center justify-end'>
  <Button type='submit' disabled={passwordloading} >
    {passwordloading ? "Changing" : "Change Password"}
  </Button>
</div>



  </form>
</div>



    </div>


    </Applayout>
   
  )
}

export default Profilepage