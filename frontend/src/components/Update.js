import React from 'react'
import { useState } from 'react';
import { authContext } from '../utils/auth';
import { useContext } from 'react';
import axios from 'axios';

function Update({ rname, rcompany, raddress, remail, rlogo, rurl, rdesignation, rphone, rtemplate, id }) {

  const authCtx = useContext(authContext);  
  const[name, setName] = useState(rname);  
  const[designation, setDesignation] = useState(rdesignation);  
  const[company, setCompany] = useState(rcompany);  
  const[address, setAddress] = useState(raddress);  
  const[email, setEmail] = useState(remail);  
  const[phone, setPhone] = useState(rphone);  
  const[logo, setLogo] = useState();  
  const[url, setUrl] = useState(rurl);  
  const[template, setTemplate] = useState(rtemplate);
  const[formError, setFormError] = useState(null);
  const[pressedFirst, setPressedFirst] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault()

    if (!email || !name || !designation || !company || !phone || !url || !address || !logo) {
        setFormError('Please Fill All Fields Correctly')
        return
      }
    console.log('pressed')
    console.log(name, designation, email, phone)
    console.log(authCtx.token)

    const data = {
    name: name,
    designation: designation,
    company: company,
    address: address,
    email: email,
    phone: phone,
    url: url,
    uid: authCtx.uid,
    template : template
    }


    const formData = new FormData()
    formData.append('files', logo[0])
    formData.append('ref', 'api::card.card')
    formData.append('field', 'logo')

    if(!pressedFirst) {
        axios.put(`http://localhost:1337/api/cards/${id}`, {data}, { headers: {
        Authorization:
          `Bearer ${authCtx.token}`,
        }}, 
        ).then((response) => {
          console.log(response)
          console.log(response.data.data.id)
          const refId = response.data.data.id
          formData.append('refId', id)
          console.log(logo)
          console.log(formData)
          axios.post("http://localhost:1337/api/upload", formData, { headers: {
          Authorization:
            `Bearer ${authCtx.token}`,
          }},)  
        .then((response)=>{
            console.log(response)
        const imageId = response.data[0].id
        }).catch((error)=>{
          //handle error
        })
        setPressedFirst(true)
        })
      } 
    }

  return (
    <>
    {!pressedFirst && <div className='w-full flex flex-col items-center'>
    <h1 className='text-xl text-purple-600 font-bold pt-5'>Create Your own digital business card!</h1>
    <form onSubmit={handleSubmit} className='flex flex-col items-center mb-5 pb-5 border-b-2 border-b-purple-500'>


    <div className='flex flex-row justify-center'>
    <div className='flex flex-col px-5'>
    <div className='flex flex-col my-3 text-center'> 
    <label htmlFor="name" className='py-2 pr-5 text-lg '>Name:</label>
    <input 
      type="text"
      id="name"
      value={name}
      onChange={(e) => setName(e.target.value)}
    //   defaultValue={card.attributes.name}
      className= 'border-2 border-purple-400 rounded-md p-3 '
    />
    </div> 

    <div className='flex flex-col my-3 text-center '>  
    <label htmlFor="company" className='py-2 pr-5 text-lg '>Company:</label>
    <input 
      type="text" 
      id="company"
      value={company}
      onChange={(e) => setCompany(e.target.value)}
    //   defaultValue={card.attributes.company}
      className= 'border-2 border-purple-400 rounded-md p-3'
    />
    </div>

    <div className='flex flex-col my-3 text-center '>
    <label htmlFor="address" className='py-2 pr-5 text-lg '>Address:</label>
    <input 
      type="text" 
      id="address"
      value={address}
      onChange={(e) => setAddress(e.target.value)}
    //   defaultValue={card.attributes.address}
      className= 'border-2 border-purple-400 rounded-md p-3'
    />
    </div>  

    <div className='flex flex-col my-3 text-center '>  
    <label htmlFor="email" className='py-2 pr-5 text-lg '>Email:</label>
    <input 
      type="text" 
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    //   defaultValue={card.attributes.email}
      className= 'border-2 border-purple-400 rounded-md p-3'
    />
    </div>
    
    
    <div className='flex flex-col my-3 text-center '> 
    <label htmlFor="logo" className='py-2 pr-5 text-lg '>Logo:</label>
    <input 
      type="file" 
      id="logo"
      onChange={(e) => setLogo(e.target.files)}
      className= 'border-2 border-purple-400 rounded-md p-3'
    />
    </div> 
    </div>


    <div className='flex flex-col px-5'>
    <div className='flex flex-col my-3 text-center '> 
    <label htmlFor="url" className='py-2 pr-5 text-lg '>URL:</label>
    <input 
      type="text" 
      id="url"
      value={url}
      onChange={(e) => setUrl(e.target.value)}
    //   defaultValue={card.attributes.url}
      className= 'border-2 border-purple-400 rounded-md p-3'
    />
    </div> 

    <div className='flex flex-col my-3 text-center '>  
    <label htmlFor="designation" className='py-2 pr-5 text-lg '>Designation:</label>
    <input 
      type="text" 
      id="designation"
      value={designation}
      onChange={(e) => setDesignation(e.target.value)}
    //   defaultValue={card.attributes.designation}
      className= 'border-2 border-purple-400 rounded-md p-3'
    />
    </div>

    <div className='flex flex-col my-3 text-center '>  
    <label htmlFor="phone" className='py-2 pr-5 text-lg '>Phone:</label>
    <input 
      type="text" 
      id="phone"
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    //   defaultValue={card.attributes.phone}
      className= 'border-2 border-purple-400 rounded-md p-3'
    />
    </div>

    <div className='flex flex-col my-3 text-center'> 
    <label htmlFor="template" className='py-2 pr-5 text-lg '>Card template:</label>
    <select 
        id='template' 
        onChange={(e) => setTemplate(e.target.value)} 
        value={template}
        className= 'border-2 border-purple-400 rounded-md p-3 px-5'>
      <option value="none">Select one</option>
      <option value="1">Default</option>
      {authCtx.isPremium && <option value="2">Premium</option>}
    </select>
    </div> 
    </div>
    </div>
    

    <button className='bg-purple-400 p-3 rounded-md mt-5' >Update Card</button>

    {formError && <p className="error">{formError}</p>}
  </form>
  </div>}

  {pressedFirst && <div className='flex justify-center h-screen items-center w-full'>
  <h1 className='text-purple-600 font-bold text-3xl'>
    Your card has been updated, check in the cards section!
  </h1>
  </div>}
  </>
  )
}

export default Update