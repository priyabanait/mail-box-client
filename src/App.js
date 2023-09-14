
import React from 'react'
import AuthForm from './AuthForm'
import Inbox from './Inbox'
import Compose from './Compose'
import { login,logout } from './store/AuthSlice'
import SentDetail from './SentDetail'
import { useDispatch,useSelector} from 'react-redux'
import Header from './Header'
import { Route, Routes ,useNavigate} from 'react-router-dom'
import EmailDetail from './EmailDetail'
import Sent from './Sent'
export default function App() {
  const select=useSelector((state)=>(state.isLogin))

  const dispatch = useDispatch(); 
  const navigate=useNavigate();
  
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
 {select ? (
        <div className='flex'>
          <Header onLogout={handleLogout}></Header>
          <Routes>
            <Route path="/inbox" element={<Inbox />} />
            <Route path="/compose" element={<Compose />} />
            <Route path="/sentDetail/:id" element={<SentDetail />} />
            <Route path="/emailDetail/:id" element={<EmailDetail />} />
            <Route path="/sent" element={<Sent />} />
          </Routes>
        </div>
      ) : (
        <div>
        <AuthForm onLogin={handleLogin}></AuthForm>
       </div>
      )}
    
    
    
    </>
  )
}
