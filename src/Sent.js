import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './Header.css'
export default function Sent() {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const navigate = useNavigate();
  const mail = useSelector((state) => state.mail);
  useEffect(() => {
    const unsubscribe = db.collection('emails').where("from", "==", mail)
    .onSnapshot((snapshot) => {
      const newEmails = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
        isChecked: false, 
      }));

      setEmails(newEmails);
    });

    return () => unsubscribe();
  }, []);

 
  const checkHandler = (e, emailId) => {
    const { checked } = e.target;

    // Update the selectedEmails array based on the checkbox status
    if (checked) {
      setSelectedEmails([...selectedEmails, emailId]);
    } else {
      setSelectedEmails(selectedEmails.filter((id) => id !== emailId));
    }

    // Update the isChecked property in the emails state
    const updatedEmails = emails.map((email) =>
      email.id === emailId ? { ...email, isChecked: checked } : email
    );

    setEmails(updatedEmails);
  };

  const deleteHandler = () => {
   selectedEmails.forEach(async (emailId) => {
      await db.collection('emails').doc(emailId).delete();
      
    });

    // Clear the selected emails array
    setSelectedEmails([]);
  };

  return (
    <div className='m-10'>
      <div className='text-red-500 mb-4'>
        <DeleteForeverIcon
          onClick={deleteHandler}
          style={{ fontSize: '50px', marginLeft: '30px' }}
        ></DeleteForeverIcon>
      </div>

      <hr className='my-4'></hr>
      {emails.length > 0 ? (
        <div className='space-y-4'>
          {emails.map((item) => (
            <div
              key={item.id}
              className={'flex items-center p-2 shadow-md hover:bg-gray-100 '}
            >
              
              <input
                type='checkbox'
                className=' mr-2 w-10 mt-1'
                onChange={(e) => checkHandler(e, item.id)}
                checked={item.isChecked || false}
              ></input>

              <StarBorderIcon className='text-gray-400'></StarBorderIcon>

              <div
                className='flex items-center ml-4 space-x-4'
                onClick={(e) => {
                  navigate(`/sentDetail/${item.id}`);
                 
                }}
              >
                <div className='flex-shrink-0 w-80'>
                  <b >{item.data.to}</b>
                </div>
                <div className='m-2 truncate  ml-40  flex flex-row basis-96 align-middle '>
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
