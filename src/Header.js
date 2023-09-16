import React from 'react'
import './Header.css'
import {NavLink} from 'react-router-dom';
import { BsFillSendCheckFill } from "react-icons/bs";

import InboxIcon from '@mui/icons-material/Inbox';

import { FaRegTrashAlt} from "react-icons/fa";

import StarRateIcon from '@mui/icons-material/StarRate';
export default function Header(props) {
  function onLogout(){
props.onLogout();
  }
  return (
    <div className=' flex'>
      <div className=' bg-purple-950'>
      <div>
        <img src='https://icons.iconarchive.com/icons/martz90/circle/512/gmail-icon.png' alt='' className='w-20 mt-8 ml-20'></img>
        <h1 className='text-2xl ml-9 mr-9 mt-4 text-cyan-400'>Mail Box Client</h1>
      </div>
      
      
      <div className='font m-10'>
      <NavLink to='/compose' className='text-lg p-4 bg-cyan-100 text-orange-950 hover:bg-slate-300  text-black mt-4' style={{borderRadius:'35px'}}>
      Compose</NavLink>
       <NavLink to='/' className='flex mt-12 p-2'> <InboxIcon></InboxIcon><p className=' text-white pl-4 mt-2'>Inbox</p><div className='mt-2 ml-4 flex text-orange-200'><div>{props.unread}<div>unread</div></div> </div></NavLink>
       
      <NavLink to='/sent' className='flex p-2'> <BsFillSendCheckFill></BsFillSendCheckFill> <p className=' text-white pl-4 mt-2'>Sent</p></NavLink>
         
        <NavLink to='/trash' className='flex mt-5 p-2 '><FaRegTrashAlt></FaRegTrashAlt><p className=' text-white pl-4 mt-2'>Trash</p></NavLink>
      <NavLink to='/starred' className='flex mt-5 p-2 '> <StarRateIcon></StarRateIcon> <p className=' text-white pl-4 mt-2'>Starred</p></NavLink>
      <button className='w-28 mt-28 text-lg bg-slate-50 hover:bg-slate-300 text-black' onClick={onLogout}>Logout</button>
      </div>
      </div>
      </div>
  )
}
