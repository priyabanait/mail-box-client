import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './Header.css'
export default function Inbox() {
  const [emails, setEmails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = db.collection('emails').onSnapshot((snapshot) => {
      const newEmails = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
        
      }));
     
      setEmails(newEmails);
    });

    return () => unsubscribe();
  }, []);
  const markAsRead = (emailId) => {
    db.collection('emails')
      .doc(emailId)
      .update({
        read: true,
      })
      
    }
  return (
    <div className='m-10'>
      <hr></hr>
      {emails.length > 0 ? (
        emails.map((item, i) => (
          <div key={item.id}>
            <div
               className={`ml-10 flex p-2 shadow-slate-200 hover:bg-slate-200 ${
                item.data.read ? 'read' : 'unread'
              }`}
              onClick={(e) => {
                navigate(`/emailDetail/${item.id}`);
                markAsRead(item.id);
              }}
            >
              <div className='flex'>
             <div> {item.data.read ? null : <div className='blue-dot'></div>}</div>
                <CheckBoxOutlineBlankIcon className='mr-4 text-slate-300 ml-2'></CheckBoxOutlineBlankIcon>
                <StarBorderIcon className='text-slate-300 '></StarBorderIcon>
                
                
                {/* Apply the blue-dot class conditionally */}
                </div>
               
              
             
              <div className=' flex flex-row basis-96 ml-4'>
                <h4><b>{item.data.to}</b></h4>
              </div>
              <div className='m-2 truncate w-96'>
                <span>
                  <b className='p-2'>{item.data.subject}</b>
                  {item.data.messageContent}
                </span>
              </div>
              <div className='ml-96 align-middle '>
                <p>
                  {new Date(item.data.timestamp?.seconds * 1000).toLocaleTimeString()}
                </p>
              </div>
            </div>
            <hr></hr>
          </div>
        ))
      ) : (
        <p>No emails to display.</p>
      )}
      <hr className='w-full'></hr>
    </div>
  );
}
