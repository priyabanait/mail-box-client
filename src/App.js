
import React from 'react'
import AuthForm from './AuthForm'
import Profile from './Profile'
import { Route, Routes } from 'react-router-dom'
export default function App() {
  return (
    <div >
   <Routes>
   <Route path="/" element={<AuthForm/>}></Route>
    <Route path="/profile" element={<Profile/>}></Route>
   </Routes>
    

    </div> 
  )
}
