import React from 'react'
import { Outlet } from 'react-router';
import { Navigate } from 'react-router';
import Applayout from '../layout/Applayout';
const Protectedroute = () => {
    const isAuthenticated = true;
    const loading = false ;
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