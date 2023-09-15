import React, { useEffect, useState } from 'react';
import { db } from './firebase';
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
  const [emails, setEmails] = useState([]);
  const dispatch = useDispatch(); 
  
  const mail = useSelector((state) => state.mail);
  const [unreadCount, setUnreadCount] = useState(0);
    const handleLogin = (token) => {
      
      dispatch(login(token)); 
   
      localStorage.setItem("token", token);
    };
    const handleLogout = () => {

      dispatch(logout()); 
      
      localStorage.removeItem("token");
    };
    useEffect(() => {
      const unsubscribe = db.collection('emails')
        .where("to", "==", mail)
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          const newEmails = snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
            
          }));
  
         
          const newUnreadCount = newEmails.filter((email) => !email.data.read).length;
          setUnreadCount(newUnreadCount);
  
          setEmails(newEmails);
        });
        return () => {
          
          unsubscribe();
        };
      }, [mail]);
    
  return (
    <>
 {select ? (
        <div className='flex'>
          <Header onLogout={handleLogout} unread={unreadCount}></Header>
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
