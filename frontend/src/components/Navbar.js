import React from 'react'
import { BrowserRouter as Router, Link, NavLink, Route, Routes } from "react-router-dom";
import { authContext } from '../utils/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const authCtx = useContext(authContext);

  function handleLogout() {
    authCtx.logout();
    navigate('/')
  } 

  return (
    <div 
    className="bg-gray-400 w-28 h-screen flex flex-col items-center px-10 sticky left-0 top-0 p-8 rounded-r-3xl ">
        <NavLink to='/' className='text-2xl px-2 py-4'>Home</NavLink>
        {!authCtx.isAuthenticated &&  <NavLink to='/login' className='text-2xl px-2 py-4'>Login</NavLink> }
        <NavLink to='/cards' className='text-2xl px-2 py-4'>Cards</NavLink> 
        {authCtx.isAuthenticated && <button onClick={handleLogout} className='text-2xl px-2 py-4'>Logout</button>}
        
      </div>
  )
}

export default Navbar