import React from 'react'
import { Outlet } from 'react-router';
import { Navigate } from 'react-router';
import Applayout from '../layout/Applayout';
import { useAuth } from '../../context/Authcontext';
const Protectedroute = () => {
    const {isAuthenticated , loading} = useAuth()
    if(loading){
        return <div>Loading...</div>
    }
  return isAuthenticated ? (
   <Applayout>
    <Outlet/>  
   </Applayout>  ) :
   (<Navigate to ="/login" replace/>)
  
}

export default Protectedroute