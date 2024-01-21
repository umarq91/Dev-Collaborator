import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Add this import
import 'firebase/auth'; // Add this import for authentication

const firebaseConfig = {
    apiKey: "AIzaSyD2zWIEyGa23yh0oxDHsRY6QyVPDfPV6hw",
    authDomain: "slack-clone-d000d.firebaseapp.com",
    projectId: "slack-clone-d000d",
    storageBucket: "slack-clone-d000d.appspot.com",
    messagingSenderId: "1064058241792",
    appId: "1:1064058241792:web:73431be27765694bcf69e5"
};

const app =initializeApp(firebaseConfig);
const db =  getFirestore(app)


export {  db };
