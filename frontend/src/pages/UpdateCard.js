import React, { useEffect } from 'react'
import { authContext } from '../utils/auth';
import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import axios from 'axios';
import Update from '../components/Update';

function UpdateCard() {
  const navigate = useNavigate()  
  const authCtx = useContext(authContext);  
  const { id } = useParams()
  

  
  const { loading, error, data } = useFetch(`http://localhost:1337/api/cards/${id}`, authCtx.token)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :</p>

  const card = data.data
  console.log(card)
  
  

    

  return (
    <div className='w-full flex flex-col items-center'>
    <div className='w-full flex flex-col items-center'>
      
      <Update rname={card.attributes.name} 
              rdesignation={card.attributes.designation} 
              rcompany={card.attributes.company} 
              raddress={card.attributes.address} 
              rurl={card.attributes.url} 
              rtemplate={card.attributes.template} 
              rphone={card.attributes.phone} 
              remail={card.attributes.email} 
              id = {id}
      />
  </div>
  
    </div>
  )
}

export default UpdateCard