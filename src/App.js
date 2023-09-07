
import React from 'react'
import AuthForm from './AuthForm'

import Compose from './Compose'
import { login } from './store/AuthSlice'
import ConfirmEmail from './ConfirmEmail'
import LoginForm from './LoginForm'
import { useDispatch } from 'react-redux'

import { Route, Routes } from 'react-router-dom'
export default function App() {
  const dispatch = useDispatch(); 
  
    const handleLogin = (token) => {
      
      dispatch(login(token)); 
   
      localStorage.setItem("token", token);
    };
  
    
  return (
    <div >
   <Routes>
   <Route path="/" element={<AuthForm onLogin={handleLogin}/>}></Route>

    <Route path="/compose" element={<Compose/>}></Route>
    <Route path="/confirmEmail" element={<ConfirmEmail/>}></Route>
    <Route path="/LoginForm" element={<LoginForm onLogin={handleLogin}/>}></Route>
   </Routes>
    

    </div> 
  )
}
