import React, { useEffect, useState, useReducer, useRef } from 'react'
import { authContext } from '../utils/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import CreatedCard from '../components/CreatedCard';
import { Link, useParams } from 'react-router-dom';
import NotFoundPage from './NotFoundPage';
import * as htmlToImage from 'html-to-image';

function SingleCard() {
  const domEl = useRef(null);
  const navigate = useNavigate()  
  const authCtx = useContext(authContext);  
  const { id } = useParams()
  const { loading, error, data } = useFetch(`http://localhost:1337/api/cards/${id}?populate=*`, authCtx.token)
  
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :</p>

  const card = data.data
  console.log(data)
  

  

  async function handleDelete() {
    await axios.delete(`http://localhost:1337/api/cards/${id}`, { headers: {
        Authorization:
          `Bearer ${authCtx.token}`,
        }})

    console.log('deleted')    
    navigate('/cards')
  }

  
  async function handleDownload () {
    const dataUrl = await htmlToImage.toPng(domEl.current);
 
    // download image
    const link = document.createElement('a');
    link.download = "html-to-img.png";
    link.href = dataUrl;
    link.click();
  }

  function handleUpdate () {

  }

  let defaultcard = <CreatedCard
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






  if(!loading ) { return (
    <div className='flex flex-row justify-center w-full items-center'>
    <div className='mt-10 px-10 flex flex-col items-center justify-center'>
        <p className='text-2xl pb-2'>Download this Card</p>
        <button 
        onClick={handleDownload}
        className='bg-blue-600 p-3 rounded-md mb-5 hover:bg-purple-600'
        >
        Download
        </button>
        <p className='text-2xl pb-2'>Delete this Card</p>
        <button 
        onClick={handleDelete}
        className='bg-red-600 p-3 rounded-md mb-5'
        >
        Delete
        </button>
        <p className='text-2xl pb-2'>Update this Card</p>
        <NavLink to={`/updatecard/${card.id}`}>
        <button className='bg-purple-600 p-3 rounded-md'>
        Update
        </button>
        </NavLink>
        
        
    </div>
    <div className='mt-10 px-10' id='domEl' ref={domEl}>
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
    </div>
    
    </div>
    
  ) }

  return (
    <NotFoundPage />
  )
}

export default SingleCard