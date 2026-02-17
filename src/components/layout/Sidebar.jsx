import React from 'react'
import { NavLink , useNavigate } from 'react-router'
import {useAuth} from "../../context/Authcontext"
import { LayoutDashboard , FileText , User , LogOut , BrainCircuit , BookOpen, Layout , X } from 'lucide-react'
const Sidebar = ({ issidebaropen , togglesidebar}) => {

  const {logout } = useAuth()
  const navigate = useNavigate()
  const handlelogout = ()=>{
    logout();
    navigate("/login")
  }

  const navlinks =[
    {to:"/dashboard" , icon:LayoutDashboard , text: "Dashboard"} ,
      {to:"/documents" , icon:FileText, text: "Documents"} ,
        {to:"/flashcards" , icon:BookOpen , text: "Flashcards"} ,
        {to:"/profile" , icon:User , text: "Profile"} ,
  ]
  return (
    <>
    
       <div className={`fixed inset-0 bg-black/30 z-40 md:hidden transition-opacity duration-2000 ${issidebaropen ? "opacity-100": "opacity-0 pointer-events-none"}`
  }  onclick={togglesidebar} aria-hidden="true" >
    </div>

    <aside className={`fixed top-0 left-0 h-full w-64 bg-white/90 backdrop-blur-lg border-r border-slate-200/60 z-50 md:relative md:w-64 md:shrink-0 md:flex md:flex-col md:translate-x-0 transition-transform duration-300 ease-in-out
      
      ${issidebaropen}? "translate-x-0" :"-translate-x-full"
      
      `}>
    
    {/* logo and close button for mobile*/}
<div className='flex items-center justify-between h-16 px-5 border-b border-slate-200/60' >
  <div className='flex items-center gap-3' >
    <div className='flex items-center justify-center w-9 h-9 rounded-xl bg-linear-to-br from-primary to-primary-dark shadow-md shadow-secondary'>
      <BrainCircuit className='text-white' size={20} strokeWidth={2.5}/>
    </div>
    <h1 className='text-sm md:text-base font-bold text-slate-900 tracking-tight'>AI Learning Assistant</h1>
  </div>
  <button className='md:hidden text-primary-dark hover:text-primary' onClick={togglesidebar} >
    <X size={24}/>
  </button>
</div>

<nav className='flex-1 py-6 px-3 space-y-1.5'>
  {navlinks.map((link) => (
    <NavLink
      key={link.to}
      to={link.to}
      onClick={togglesidebar}
      className={({ isActive }) =>
        `group flex items-center gap-3 px-4 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${
          isActive
            ? "bg-linear-to-r from-primary-dark to-primary text-white shadow-lg shadow-primary-dark"
            : "text-slate-700 hover:bg-slate-100 hover:text-slate-900"
        }`
      }
    >
      {({isActive})=>
      <>
      <link.icon size={18} strokeWidth={2.5} className={`transition-transform duration-200 ${isActive ? " " : "group-hover:scale-110"}`}
      />
      {link.text}
      </>
      }
    </NavLink>
  ))}
</nav>

 {/* logout section*/}
<div >
  <button onClick={handlelogout} className=''></button>
  <LogOut size={18} strokeWidth={2.5}/>
</div>
</aside>
    </>
 
  )
}

export default Sidebar