import React, { useState } from 'react'
import Sidebar from "./Sidebar.jsx"
import Header from "./Header.jsx"
const Applayout = ({children}) => {
  const [issidebaropen , setissidebaropen] = useState(false)
  const togglesidebar = ()=>{
    setissidebaropen(!issidebaropen)
  }
  return (
    <div className='flex h-screen bg-neutral-50 text-neutral-900'>
      <Sidebar issidebaropen={issidebaropen} togglesidebar={togglesidebar}/>
<div className='flex-1 flex flex-col overflow-hidden'>
  <Header togglesidebar={togglesidebar}/>
  <main className='flex-1 overflow-x-hidden overflow-y-auto p-6'>
    {children}
  </main>
</div>


    </div>
  )
} 

export default Applayout