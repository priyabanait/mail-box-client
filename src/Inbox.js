import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './Header.css';

export default function Sent() {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const navigate = useNavigate();
  const mail = useSelector((state) => state.mail);

  useEffect(() => {
    const unsubscribe = db.collection('emails')
      .where("to", "==", mail)
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        const newEmails = snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
          isChecked: false,
        }));
        setEmails(newEmails);
      });

    return () => {
      
      unsubscribe();
    };
  }, [mail]);

  const markAsRead = async (emailId) => {
  
    try {
      await db.collection('emails')
        .doc(emailId)
        .update({
          read: true,
        });
    } catch (error) {
      console.error("Error marking email as read:", error);
    }
  };

  const checkHandler = (e, emailId) => {
    const { checked } = e.target;

   
    if (checked) {
      setSelectedEmails([...selectedEmails, emailId]);
    } else {
      setSelectedEmails(selectedEmails.filter((id) => id !== emailId));
    }

   
    const updatedEmails = emails.map((email) =>
      email.id === emailId ? { ...email, isChecked: checked } : email
    );

    setEmails(updatedEmails);
  };

  const deleteHandler = async () => {
   
    try {
      for (const emailId of selectedEmails) {
        await db.collection('emails').doc(emailId).delete();
      }

   
      setSelectedEmails([]);
    } catch (error) {
      console.error("Error deleting emails:", error);
    }
  };

  return (
    <div className='m-10'>
      <div className='text-red-500 mb-4'>
        <DeleteForeverIcon
          onClick={deleteHandler}
          style={{ fontSize: '50px', marginLeft: '30px', cursor: 'pointer' }}
        ></DeleteForeverIcon>
        
      </div>

      <hr className='my-4'></hr>
      {emails.length > 0 ? (
        <div className='space-y-4'>
          {emails.map((item, i) => (
            <div
              key={item.id}
              className={`flex items-center p-2 shadow-md hover:bg-gray-100 ${
                item.data.read ? 'text-gray-600' : 'text-black'
              }`}
            >
              <div className='flex-shrink-0 flex-row basis-2'>
                {item.data.read ? null : (
                  <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                )}
              </div>
              <input
                type='checkbox'
                className='mr-2 w-10 mt-1'
                onChange={(e) => checkHandler(e, item.id)}
                checked={item.isChecked || false}
              ></input>

              <StarBorderIcon className='text-gray-400'></StarBorderIcon>

              <div
                className='flex items-center ml-4 space-x-4'
                onClick={(e) => {
                  navigate(`/emailDetail/${item.id}`);
                  markAsRead(item.id);
                }}
                style={{ cursor: 'pointer' }}
              >
                <div className='flex-shrink-0 w-80'>
                  <b>{item.data.from}</b>
                </div>
                <div className='m-2 truncate ml-40 flex flex-row basis-96 align-middle'>
                  <span className='truncate w-96'>
                    <b className='p-2'>{item.data.subject}</b>
                    {item.data.message}
                  </span>
                </div>
                <div className='flex-shrink-0 ml-4'>
                  <p>
                    {new Date(item.data.timestamp?.seconds * 1000).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No emails to display.</p>
      )}
      <hr className='w-full'></hr>
    </div>
  );
}
