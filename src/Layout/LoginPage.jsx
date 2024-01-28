import { Button } from '@mui/material'
import React, { useRef } from 'react'
import { auth, db } from '../firebase';
import {  GoogleAuthProvider , signInWithPopup } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { loggedInUser } from '../redux/appSlice';
import { doc, getDoc, setDoc } from 'firebase/firestore';
function LoginPage() {
  const dispatch = useDispatch();

  const handleSubmit =async (e)=>{
  e.preventDefault();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    dispatch(loggedInUser(result.user)) // set use in redux for global user
    const user = result.user
  const userRef = doc(db,"users",user?.uid);
  const userDoc = await getDoc(userRef);

  if(!userDoc.exists()){
    await setDoc(userRef,{
      name: user.displayName,
      email:user.email,
      userId: user.uid,
      profile : user.photoURL , 
      isOnline : true 
    }, {merge: true}) // Merge to overWrite existing files

  }else{
    await setDoc(userRef,{
      isOnline:true
    }, { merge : true})
  }

  } catch (error) {
    console.error(error);
  }
  }


  
  return (
    <div className='h-full grid place-items-center  bg-[#f8f8f8]'>
        <div className="p-[100px] text-center bg-white rounded-lg shadow-xl" >

              <img className='object-contain h-[100px] mb-10 place-items-center' src='https://assets-global.website-files.com/621c8d7ad9e04933c4e51ffb/62540c4a83ecf31d4fb3c9a9_Group%205650.png'/>
            <h1 className='font-bold text-lg'> Sign In To Join Community </h1>
            <p className='text-sm'> Join Umar & Team </p>

            <Button
          type='submit'
          onClick={handleSubmit}
          sx={{ margin: '12px', color: 'white', backgroundColor: '#0a8d48' }}
        >
          Sign in with Google
        </Button>

        </div>

    </div>
  )
}

export default LoginPage