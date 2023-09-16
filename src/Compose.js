import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';
import { db } from './firebase';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/firestore';
import { useSelector } from 'react-redux';
export default function Compose() {
  const mail=useSelector((state)=>(state.mail))
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [to, setTo] = useState('');
  
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

  function formSubmit(event) {
    event.preventDefault();
    const messageContent = editorState.getCurrentContent().getPlainText();
    setMessage(messageContent);

    if (to === '') {
      alert('Please enter Recipient');
    }
   else if (subject === '') {
      alert('Please enter Subject');
    }
    else if (messageContent.trim() === '') {
      alert('Please enter Message');
    }
    else if (to === mail) {
      alert('You cannot send an email to yourself.');
      return;
    }
    db.collection('emails').add({
      from:mail,
      to,
      subject,
      message: messageContent, 
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      read: false,
      
    });

    
    setTo('');
    setSubject('');
    setMessage('');
    setEditorState(EditorState.createEmpty()); 
  }
  

  return (
    <div>
      <div className="bg-slate-300 mt-2 ml-4">
        <span className="p-4 font-bold">New Message</span>
      </div>
      <form onSubmit={formSubmit}>
        <div className="p-2 ml-4 mt-2" style={{ border: '0.1px dotted grey', borderRadius: '5px' }}>
          <label>To</label>
          <input
            type="email"
            placeholder="example@gmail.com"
            className="outline-0 p-2"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          ></input>
        </div>

        <div className="p-2 ml-4 mt-2" style={{ border: '0.1px dotted grey', borderRadius: '5px' }}>
          <input
            type="text"
            className="outline-0"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          ></input>
        </div>

        <div className="mt-4 ml-4 p-4" style={{ height: '400px', border: '0.1px dotted grey', borderRadius: '5px' }}>
          <Editor
          placeholder='Start writing...'
            editorState={editorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            onEditorStateChange={onEditorStateChange}
          />
        </div>

        <div>
          <div className="pl-4">
            <button className="w-28 text-lg bg-indigo-600 hover:bg-indigo-500 text-white mt-4">Send</button>
          </div>
        </div>
      </form>

      
    </div>
  );
}
