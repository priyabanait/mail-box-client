
import React from 'react'
import AuthForm from './AuthForm'
import Inbox from './Inbox'
import Compose from './Compose'
import { login } from './store/AuthSlice'
import ConfirmEmail from './ConfirmEmail'
import LoginForm from './LoginForm'
import { useDispatch } from 'react-redux'
import Header from './Header'
import { Route, Routes } from 'react-router-dom'

export default function App() {
  const dispatch = useDispatch(); 
  
    const handleLogin = (token) => {
      
      dispatch(login(token)); 
   
      localStorage.setItem("token", token);
    };
  
    
  return (
    <div className='flex'>
    <Header></Header>
   <Routes>
   <Route path="/" element={<AuthForm onLogin={handleLogin}/>}></Route>
   <Route path="/inbox" element={<Inbox/>}></Route>
    <Route path="/compose" element={<Compose/>}></Route>
    <Route path="/confirmEmail" element={<ConfirmEmail/>}></Route>
    <Route path="/LoginForm" element={<LoginForm onLogin={handleLogin}/>}></Route>
    
   </Routes>
    

    </div> 
  )
}
