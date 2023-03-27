import React, { useEffect, useState, useReducer } from 'react'
import { authContext } from '../utils/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import CreatedCard from '../components/CreatedCard';
import { Link } from 'react-router-dom';


export default function Cards() {

    const authCtx = useContext(authContext);
    const navigate = useNavigate();

  const { loading, error, data } = useFetch(`http://localhost:1337/api/cards?populate=*&filters[uid]=${authCtx.uid}`, authCtx.token)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :</p>

  console.log(data)


  return (
    <div className='flex flex-row justify-center w-full'>
    <div className='flex flex-col px-10 mt-52'>
      <div className='flex flex-col pr-40 fixed left-40'>
      <h1 className='text-purple-600 font-bold text-3xl pb-5'>Create a New card here!</h1>
      <NavLink to='/details'>
      <button className='bg-purple-400 p-5 rounded-md'>Create Card</button>
      </NavLink>
      </div>
    </div>

    {data.data && 

      <div className='flex flex-col px-10 pl-80'>
      {data.data.map(card => (
        <div className='flex w-full justify-center'>
        <div key={card.id} className='flex flex-col items-center py-6 my-8 border-b-2 border-blue-400'>
          <CreatedCard 
            email={card.attributes.email}
            phone={card.attributes.phone}
            name={card.attributes.name}
            designation={card.attributes.designation}
            address={card.attributes.address}
            company={card.attributes.company}
            url={card.attributes.url}
            template={card.attributes.template}
            logo={card.attributes.logo}
          />
        <NavLink to={`/singlecard/${card.id}`} className='mt-4'>
        <button className='bg-blue-400 p-3 rounded-md'>View Card</button>
        </NavLink>
        </div>
        </div>
      ))}
      </div>  
    }

    </div>
  )
}