import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyCuO-qvcUY3-qqpneiY5mWMeb08dAsIdKs",
    authDomain: "mail-box-client-94a5f.firebaseapp.com",
    databaseURL: "https://mail-box-client-94a5f-default-rtdb.firebaseio.com",
    projectId: "mail-box-client-94a5f",
    storageBucket: "mail-box-client-94a5f.appspot.com",
    messagingSenderId: "366686585241",
    appId: "1:366686585241:web:57528c86aeda43ed741308"
  };
  const firebaseApp=firebase.initializeApp(firebaseConfig);
  const db=firebaseApp.firestore();
  export  {db}