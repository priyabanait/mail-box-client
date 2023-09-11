import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { useNavigate } from 'react-router-dom';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import './Header.css'
export default function Inbox() {
  const [emails, setEmails] = useState([]);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = db.collection('emails').onSnapshot((snapshot) => {
      const newEmails = snapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
        isChecked: false, 
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
      });
  };

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
    <div  className=' text-red-500 ml-8 mb-4'  >
    <DeleteForeverIcon onClick={deleteHandler} style={{ fontSize: '50px',marginLeft:'30px' }}></DeleteForeverIcon>
    </div>

      <hr></hr>
      {emails.length > 0 ? (
        emails.map((item, i) => (
          <div key={item.id}>
            <div
               className={`ml-10 flex p-2 shadow-slate-200 hover:bg-slate-200 ${
                item.data.read ? 'read' : 'unread'
              }`}
             
            >
            <div className='flex flex-row basis-6 mt-2'> {item.data.read ? null : <div className='blue-dot'></div>}</div>
            <input
           type="checkbox"
           className="mb-4 mr-4 w-4"
           onChange={(e) => checkHandler(e, item.id)} 
          checked={item.isChecked || false}
           ></input> 

                <StarBorderIcon className='text-slate-300 '></StarBorderIcon>
                
              
               
              <div className='flex flex-row basis-96 ml-4 align-middle'  onClick={(e) => {
                navigate(`/emailDetail/${item.id}`);
                markAsRead(item.id);
              }}>
             
               
              
             
              <div className=' flex flex-row basis-40 ml-4 align-middle '>
                <h4><b>{item.data.to}</b></h4>
              </div>
              <div className='m-2 truncate  ml-10  flex flex-row basis-72 align-middle '>
                <span className='truncate w-96'>
                  <b className='p-2'>{item.data.subject}</b>
                  {item.data.messageContent}
                </span>
              </div>
              <div className=' ml-96 align-middle'>
                <p>
                  {new Date(item.data.timestamp?.seconds * 1000).toLocaleTimeString()}
                </p>
              </div>
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
