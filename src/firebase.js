import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Add this import
import 'firebase/auth'; // Add this import for authentication
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "",
    authDomain: "slack-clone-d000d.firebaseapp.com",
    projectId: "slack-clone-d000d",
    storageBucket: "slack-clone-d000d.appspot.com",
    messagingSenderId: "1064058241792",
    appId: ""
};

const app =initializeApp(firebaseConfig);
const db =  getFirestore(app)

const auth = getAuth(app);


export {  db ,auth};
