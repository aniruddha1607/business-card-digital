import React from 'react'
import { HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import { IoLocation } from "react-icons/io5";
import { MdMapsHomeWork } from "react-icons/md";

const api_url = "http://localhost:1337"

function CreatedCard({ email, name, designation, company, phone, url, address, template, logo }) {
  if(template === '1')
  return (
    <div className='flex justify-center w-full'>
    <div className=' bg-white w-80 text-center flex-col rounded-xl p-4 shadow-lg'>
    <div className='bg-white h-36'>
    <img src={api_url + logo.data.attributes.formats.small.url} style={{ width: 300, height: 150 }}/>
    </div>
    <div className='pt-6'>
        <p className='text-3xl font-bold text-blue-400 underline'>{name}</p>
        <p className='text-xl font-bold text-blue-300 mt-2'>{designation}</p>
        <p className='pt-5 pb-3'>Contact Me:</p>
        <div className='flex flex-row text-center pb-12 justify-center'>
          <a href= {`mailto: ${email}`} className='bg-gray-300 rounded-md px-2 py-3 flex flex-row mx-3'> 
          Email <HiOutlineMail size={24} className='pl-1'/>
          </a>
          <a href= {`mailto: ${email}`} className='bg-gray-300 rounded-md px-2 py-3 flex flex-row mx-3'> 
          {phone} <FiPhone size={24} className='pl-1'/>
          </a>
          <p></p>
        </div>
        
        <p className='flex flex-row items-center text-xl justify-start ml-10'>
        <MdMapsHomeWork className='mr-2'/>
        {company}
        </p>
        
        <p className='flex flex-row items-center text-xl justify-start ml-10'>
        <IoLocation className='mr-2'/>
        {address}
        </p>
        <p className='pt-7 underline text-blue-300'>{url}</p>
    </div>
    </div>
    </div>
  )
  else if (template === '2') {
    return (
      <div className='flex justify-center w-full'>
      <div className=' bg-gray-500 w-80 text-center flex-col rounded-xl p-4 shadow-lg'>
      <div className='bg-white h-36'>
      <img src={api_url + logo.data.attributes.formats.small.url} style={{ width: 300, height: 150 }}/>
      </div>
      <div className='pt-6'>
          
          <p className='text-3xl font-bold text-blue-400 underline'>{name}</p>
          <p className='text-xl font-bold text-blue-300 mt-2'>{designation}</p>
          <p className='pt-5 pb-3'>Contact Me:</p>
          <div className='flex flex-row text-center pb-12 justify-center'>
            <a href= {`mailto: ${email}`} className='bg-gray-300 rounded-md px-2 py-3 flex flex-row mx-3'> 
            Email <HiOutlineMail size={24} className='pl-1'/>
            </a>
            <a href= {`mailto: ${email}`} className='bg-gray-300 rounded-md px-2 py-3 flex flex-row mx-3'> 
            {phone} <FiPhone size={24} className='pl-1'/>
            </a>
            <p></p>
          </div>
          
          <p className='flex flex-row items-center text-xl justify-start ml-10'>
          <MdMapsHomeWork className='mr-2'/>
          {company}
          </p>
          
          <p className='flex flex-row items-center text-xl justify-start ml-10'>
          <IoLocation className='mr-2'/>
          {address}
          </p>
          <p className='pt-7 underline text-blue-300'>{url}</p>
      </div>
      </div>
      </div>
    )
  }
}

export default CreatedCard