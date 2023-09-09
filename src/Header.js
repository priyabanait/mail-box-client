import React from 'react'
import './Header.css'
import {Link} from 'react-router-dom';
import { BsFillSendCheckFill } from "react-icons/bs";

import InboxIcon from '@mui/icons-material/Inbox';

import { FaRegTrashAlt} from "react-icons/fa";

import StarRateIcon from '@mui/icons-material/StarRate';
export default function Header() {
  return (
    <div className='flex'>
      <div className='bg-black'>
      <div>
        <img src='https://icons.iconarchive.com/icons/martz90/circle/512/gmail-icon.png' alt='' className='w-20 mt-9 ml-20'></img>
        <h1 className='text-2xl ml-9 mr-9 mt-4 text-cyan-400'>Mail Box Client</h1>
      </div>
      
      
      <div className='font m-10'>
      <Link to='/compose' className='text-lg p-2 bg-indigo-600 hover:bg-indigo-500  text-white mt-2'>
      Compose</Link>
       <Link to='inbox' className='flex mt-10 '> <InboxIcon></InboxIcon><p className=' text-white pl-4 mt-2'>Inbox</p></Link>
      <Link to='/sent' className='flex mt-5'> <BsFillSendCheckFill></BsFillSendCheckFill> <p className=' text-white pl-4 mt-2'>Sent</p></Link>
         
        <Link className='flex mt-5'><FaRegTrashAlt></FaRegTrashAlt><p className=' text-white pl-4 mt-2'>Trash</p></Link>
      <Link className='flex mt-5'> <StarRateIcon></StarRateIcon> <p className=' text-white pl-4 mt-2'>Starred</p></Link>
      <button className='mt-48 w-28 text-lg bg-slate-50 hover:bg-slate-200  text-black'>Logout</button>
      </div>
      </div>
     
      
      
    </div>
  )
}
