import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
export default function EmailDetail() {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
const navigate=useNavigate();
  useEffect(() => {
    // Fetch the email details based on the 'id' parameter.
    db.collection("emails")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setEmail(doc.data());
        } else {
          console.log('No data present');
        }
      })
      
  }, [id]);

  if (!email) {
    return <p>Loading...</p>;
  }

  return (
    <div>
   
   <div className=' flex'> <ArrowBackIcon onClick={e=>navigate('/inbox')}></ArrowBackIcon>
   <p className='ml-2'>Back</p></div>
      <h2>Email Details</h2>
      <p>To: {email.to}</p>
      <p>Subject: {email.subject}</p>
     
      <p>Message: {email.messageContent}</p>
      
    </div>
  );
}