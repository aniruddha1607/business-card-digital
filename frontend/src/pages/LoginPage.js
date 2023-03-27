import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { login } from '../utils/request';
import { authContext } from '../utils/auth';
import { useContext } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Link, NavLink, Route, Routes } from "react-router-dom";

function LoginPage() {
  const authCtx = useContext(authContext);
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[formError, setFormError] = useState(null)
  const[token, setToken] = useState(null)
  const navigate = useNavigate()  

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      setFormError('Please Fill All Fields Correctly')
      return
    }

        await axios
        .post('http://localhost:1337/api/auth/local', {
            identifier: email,
            password: password
        })
        .then(response => {
            console.log('User profile', response.data.user.id);
            console.log('User token', response.data.jwt);
            authCtx.authenticate(response.data.jwt, response.data.user.id)
            if(response.data.user.premium) {
              authCtx.premium();
            }
        })
        .catch(error => {
            setFormError('An error occurred:', error.response);
        });
        
      
    navigate('/cards', { replace: true })

  }

  return (
    <div className='w-full flex flex-col items-center'>
        <form onSubmit={handleSubmit} className='flex flex-col items-center mb-5 pb-5 border-b-2 border-b-purple-500'>
        <div className='flex flex-col my-5 text-center '>
        <label htmlFor="email" className='py-2 pr-5 text-lg '>Email:</label>
        <input 
          type="text" 
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className= 'border-2 border-black rounded-md p-3'
        />
        </div>
        
        <div className='flex flex-col my-5 text-center '>
        <label htmlFor="password" className='py-2 pr-5 text-lg'>Password:</label>
        <input 
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className= 'border-2 border-black rounded-md p-3'
        />
        </div>

        {/* <label htmlFor="rating">Rating:</label>
        <input 
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        /> */}

        <button className='bg-blue-400 py-2 px-5 rounded-md'>Login</button>

        {formError && <p className="error">{formError}</p>}
      </form>
      <div className='flex flex-col items-center'>
        <p className='pb-3'>New user? Register from the link below !</p>
        <NavLink to='/signin' className='bg-purple-400 p-3 rounded-md'>Register!</NavLink>
      </div>
    </div>
  )
}

export default LoginPage