import React from 'react';
import './ConfirmEmail.css'
export default function ConfirmEmail() {
  return (
    <div className='confirm'>
      <h2 className='text-4xl font-bold text-center py-4'> Account Confirmation</h2>
      <p className='text-2xl'>An email with your account confirmation link has been sent to your email</p>
      <p className='text-2xl'>Check your email and come back to proceed!</p>
     <a href='/LoginForm'><button className='py-3 w-60 mt-8 text-lg bg-indigo-600 hover:bg-indigo-500 relative text-white'>Proceed</button></a>
    </div>
  )
}