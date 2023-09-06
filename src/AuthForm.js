import { useRef, useState} from 'react';


const AuthForm = () => {
    
  
  const[action,setAction]=useState(true);
  const emailRef=useRef();
  const passwordRef=useRef();

  function signUpHandle(){
    setAction((data)=>
    !data);
  }
  async function submitHandler(event){
  event.preventDefault();

const enterdEmail=emailRef.current.value;
const enterdPassword=passwordRef.current.value;
localStorage.setItem('email',enterdEmail)
let url;
if(action){
 url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCuO-qvcUY3-qqpneiY5mWMeb08dAsIdKs'
}
else{
  url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCuO-qvcUY3-qqpneiY5mWMeb08dAsIdKs'
  
}
const res= await fetch(url,{
  method:'POST',
  body:JSON.stringify({
    email:enterdEmail,
    password:enterdPassword,
    returnSecureToken:true
  }),
  headers:{
    'Content-Type':'application/json'
  }
})
 
if (res.ok) {
  const data = await res.json();
  
  console.log('User has successfully signed up');
 if(!action){

  try{
    const resVerify= fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCuO-qvcUY3-qqpneiY5mWMeb08dAsIdKs',{
          method:'POST',
        
          body:JSON.stringify({
            requestType:"VERIFY_EMAIL",
              idToken:data.idToken,
              }),
              
              headers:{
                  'Content-Type':'application/json'
                }
        })
          if(resVerify.ok){
          
            console.log("Success");
           
          }
         }
          catch (error) {
            console.error('Error updating account:', error);
  
          }
          
 }
  
 
} else {
  alert('Authentication failed!')
}

}
  return (
    <div className='w-full h-screen flex'>
    <div className='grid grid-cols-1 md:grid-cols-2 m-auto h-[550px] shadow-lg shadow-gray-600 sm:max-w-[900px]'>
        <div className='w-full h-[550px] hidden md:block'>
            <img className='w-full h-full' src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg' alt="/" />
        </div>
        <div className='p-4 flex flex-col justify-around'>
        <form className='max-w-[400px] w-full mx-auto bg-white'>
            <h2 className='text-4xl font-bold text-center py-4'>{!action?"Sign Up":"Login"}</h2>
            
            <div className='flex flex-col mb-4'>
               
                <input placeholder="Email" ref={emailRef} className='border relative bg-gray-100 p-2' type="text" />
            </div>
            <div className='flex flex-col mb-4'>
               
                <input  placeholder="Password" ref={passwordRef} className='border relative bg-gray-100 p-2' type="password" />
            </div>
           {!action && <div className='flex flex-col '>
               
                <input placeholder="Confirm password"ref={passwordRef}  className='border relative bg-gray-100 p-2' type="password" />
            </div>}
            <button onClick={submitHandler} className='w-full py-3 mt-8 bg-indigo-600 hover:bg-indigo-500 relative text-white'>Sign In</button>
            <p className='text-center mt-8 text-blue-500'>Forget password</p>
           <button type='button' className='text-center ml-20 mt-8 text-purple-500' onClick={signUpHandle}>
           {!action? 'Have an account?Login':"Don't have an account?Sign Up"}</button>
            
        </form>
           
        </div>
    </div>
</div>
  );
};

export default AuthForm;
