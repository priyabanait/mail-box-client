import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from './firebase';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export default function SentDetail() {
  const { id } = useParams();
  const [email, setEmail] = useState([]);
const navigate=useNavigate();

  useEffect(() => {
    // Fetch the email details based on the 'id' parameter.
    db.collection('emails')
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
  const deleteHandler = () => {
    db.collection('emails')
      .doc(id).
      delete()
       
     navigate('/inbox');
 
     // Clear the selected emails array
     setEmail([]);
   };
  return (
    <div className='m-4'>
    <div className='text-red-500 mb-4 ml-2'>
        <DeleteForeverIcon
          onClick={deleteHandler}
          style={{ fontSize: '50px', marginLeft: '30px' }}
        ></DeleteForeverIcon>
      </div>
    <div className=' flex m-4'> 
    <ArrowBackIcon onClick={e=>navigate('/sent')}></ArrowBackIcon>
    <p className='ml-2'> Back</p>
    </div>
    <hr></hr>
    <div className=''>
    <p style={{fontSize:'30px'}} className='ml-20'> {email.subject}</p>
  <div className='flex mt-4'>
  <AccountCircleIcon style={{fontSize:'40px', color:"blueviolet"}} className='ml-8'></AccountCircleIcon>
  <b className='mt-2  ml-2'>{email.from}</b>
  </div>
     
      
       <p className='ml-20'>to {email.to}</p>
      
      
       <p className='m-24'>{email.message}</p>
       
    </div>
     </div>
   );
 }