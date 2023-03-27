import React, { useState } from 'react'
import { createUser } from '../utils/request'
import { authContext } from '../utils/auth';
import { useContext } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
    const authCtx = useContext(authContext);
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')
    const[username, setUsername] = useState('')
    const[formError, setFormError] = useState(null)
    const navigate = useNavigate()  

    const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password || !username) {
      setFormError('Please Fill All Fields Correctly')
      return
    }

    await axios
      .post('http://localhost:1337/api/auth/local/register', {
        username: username,
        email: email,
        password: password,
      })
      .then(response => {
        console.log('User profile', response.data.user);
        console.log('User token', response.data.jwt);
        authCtx.authenticate(response.data.jwt, response.data.user.id)
        if(response.data.user.premium) {
          authCtx.premium();
        }
      })
      .catch(error => {
        console.log('An error occurred:', error.response);
      });
    
      
    navigate('/cards', { replace: true })

  } 
  return (
    <div className='w-full flex flex-col items-center'>
        <form onSubmit={handleSubmit} className='flex flex-col items-center mb-5 pb-5 border-b-2 border-b-purple-500'>

        <div  className='flex flex-col my-5 text-center '>
        <label htmlFor="username" className='py-2 pr-5 text-lg '>Username:</label>
        <input 
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className= 'border-2 border-black rounded-md p-3'
        />
        </div>
        
        <div  className='flex flex-col my-5 text-center '>
        <label htmlFor="email" className='py-2 pr-5 text-lg '>Email:</label>
        <input 
          type="text" 
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className= 'border-2 border-black rounded-md p-3'
        />
        </div>

        <div  className='flex flex-col my-5 text-center '>
        <label htmlFor="password" className='py-2 pr-5 text-lg '>Password:</label>
        <input 
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className= 'border-2 border-black rounded-md p-3'
        />
        </div>

        

        <button className='bg-purple-400 p-3 rounded-md' >Register</button>

        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default SignupPage