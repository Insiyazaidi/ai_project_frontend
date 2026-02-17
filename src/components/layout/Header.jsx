import React from 'react'
import { useAuth } from '../../context/Authcontext'
import {Bell , User ,Menu} from "lucide-react"
const Header =({togglesidebar}) => {
    const {user} = useAuth()
  return <header>
    <div>

 <div className=''>
        <button onClick={togglesidebar} className='' aria-label="toggle-sidebar">
<Menu size={24}/>
        </button>
    </div>


<div>
<button onClick={togglesidebar} className='' aria-label="toggle-sidebar">
<Bell size={20} strokeWidth={2} className=''/>
<span className=''></span>
        </button> 
        </div>

   
    <div>
        <div>
            <div><User/></div>
       
        <div> <p className=''>{user?.username || "User"}</p>
          <p className=''>{user?.email || "test@gmail.com"}</p> </div>

        </div>
    </div>


    </div>
   

   </header>
  
}

export default Header