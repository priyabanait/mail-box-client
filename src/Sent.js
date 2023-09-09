import React, { useEffect, useState } from 'react'
import { db } from './firebase';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import StarBorderIcon from '@mui/icons-material/StarBorder';
export default function Sent() {
  const[emails,setEmails]=useState([]);
  
  useEffect(()=>{
  
     db.collection("emails").onSnapshot((snapshot)=>{
      setEmails(snapshot.docs.map(doc=>({
        id:doc.id,
     data:doc.data()
      })))
     })
  },[])
  
  return (
    <div className='mt-10'>
     <hr></hr>
     {emails.length > 0 ? (
      emails.map((item,i) => (
        
        <div key={item.id} >
        
      <div className='ml-10 flex p-5 shadow-slate-50'>
      <div className='flex'>
      
      <CheckBoxOutlineBlankIcon className='mr-4 text-slate-300'></CheckBoxOutlineBlankIcon>
      <StarBorderIcon className='text-slate-300 '></StarBorderIcon>
      </div>
      <div className='ml-4'>
      <h4><b>{item.data.to}</b></h4>
      </div>
            
            <div className='ml-20 '>
              <p><b>{item.data.subject}</b>  {item.data.messageContent}</p>
      
            </div>
            <div className='ml-96 '>
            <p>{new Date(item.data.timestamp?.seconds*1000).toLocaleTimeString()}</p>
            </div>
            </div>
     <hr></hr>
    </div>
    
    ))): (
      <p>No emails to display.</p>
    )}
    <hr className='w-full'></hr>
    </div>
  )
}
