import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'; // Add this import
import 'firebase/auth'; // Add this import for authentication
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_firebase_apiKey,
    authDomain: import.meta.env.VITE_domain,
    projectId: "slack-clone-d000d",
    storageBucket: import.meta.env.storageBucket,
    messagingSenderId: import.meta.env.messagingSenderId,
    appId: import.meta.env.appId
};

const app =initializeApp(firebaseConfig);
const db =  getFirestore(app)

const auth = getAuth(app);


export {  db ,auth};
