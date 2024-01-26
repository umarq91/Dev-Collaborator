import { Button } from '@mui/material'
import React from 'react'
import { auth } from '../firebase';
import {  GoogleAuthProvider , signInWithPopup } from 'firebase/auth';
function LoginPage() {


  const handleSubmit =async (e)=>{
  e.preventDefault();
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
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