
import './Compose.css';
import React,{useState} from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';

export default function Compose() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
const [to,setTo]=useState('');
const [subject,setSubject]=useState('');

    const onEditorStateChange = (newEditorState) => {
      setEditorState(newEditorState);
    }
    function formSubmit(event){
        event.preventDefault();
        const messageContent = editorState.getCurrentContent().getPlainText();
   
    if(to===''){
        alert('Please enter Recipient')
    }
    if(subject===''){
        alert('Please enter Subject')
    }
    if(messageContent.trim()===''){
        alert('Please enter Message')
    }
    localStorage.setItem('mail',to);
    const mail=localStorage.getItem('mail');
    db.collection(mail).add({
        to,
        subject,
        messageContent,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    setTo('');
    setSubject('');
    }
  return (
    <div>
      <div className='bg-slate-300 mt-2'>
   <span className='p-4 font-bold'>New Message</span>
<hr></hr>
      </div>
<form onSubmit={formSubmit}>
      <div className='p-4'>
      <label> To</label>
 <input type='email' placeholder='example@gmail.com' className='outline-0 p-2' value={to} onChange={(e)=>setTo(e.target.value)}></input>
  <hr></hr>
  </div>

      <div className='p-4'>
 
 <input type='text' className='outline-0' placeholder='Subject' value={subject} onChange={(e)=>setSubject(e.target.value)}></input>

 <hr></hr>
 <div className= 'mt-2' style={{ height: '400px' }}>
          <Editor
          
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
            
          />
        </div>
	
 <hr></hr>
      </div>
      <div className='footer'>
      <div className='pl-4'>
    <button className='w-28 text-lg bg-indigo-600 hover:bg-indigo-500  text-white'>Send </button>
      </div>
   <div className='right'>
   
   </div>
      </div>
      </form>
    </div>
  )
}
