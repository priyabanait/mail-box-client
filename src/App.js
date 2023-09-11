
import React from 'react'
import AuthForm from './AuthForm'
import Inbox from './Inbox'
import Compose from './Compose'
import { login,logout } from './store/AuthSlice'
import ConfirmEmail from './ConfirmEmail'
import LoginForm from './LoginForm'
import { useDispatch,useSelector} from 'react-redux'
import Header from './Header'
import { Route, Routes ,useNavigate} from 'react-router-dom'
import EmailDetail from './EmailDetail'

export default function App() {
  const dispatch = useDispatch(); 
  const navigate=useNavigate();
  const select=useSelector((state)=>(state.isLogin))
    const handleLogin = (token) => {
      
      dispatch(login(token)); 
   
      localStorage.setItem("token", token);
    };
    const handleLogout = () => {

      dispatch(logout()); 
      navigate('/')
      localStorage.removeItem("token");
    };
    
  return (
    <>

    
    <div className='flex'>
   <Header onLogin={handleLogout}></Header>
   <Routes>

   <Route path="/inbox" element={<Inbox/>}></Route>
    <Route path="/compose" element={<Compose/>}></Route>
    <Route path="/confirmEmail" element={<ConfirmEmail/>}></Route>
    <Route path="/LoginForm" element={<LoginForm onLogin={handleLogin}/>}></Route>
    <Route path="/emailDetail/:id" element={<EmailDetail/>}></Route>
   </Routes>
    

    </div> 
    </>
  )
}
