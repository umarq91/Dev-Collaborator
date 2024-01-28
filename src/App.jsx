import React from 'react';
import {Route, BrowserRouter,Routes } from 'react-router-dom';

import Sidebar from './Layout/Sidebar';
import Chat from './Layout/Chat';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { Login } from '@mui/icons-material';
import LoginPage from './Layout/LoginPage';
import { SyncLoader} from 'react-spinners';
import Header from './Layout/Header';
import { ToastContainer } from 'react-toastify';

function App() {

  const [user, loading, error] = useAuthState(auth);

  if(loading){
    return(
      <div>

          <div>

          <div className='h-full grid place-items-center  bg-[#f8f8f8]'>
        <div className="p-[100px] text-center bg-white rounded-lg shadow-xl" >

              <img className='object-contain h-[100px] mb-10 place-items-center' src='https://assets-global.website-files.com/621c8d7ad9e04933c4e51ffb/62540c4a83ecf31d4fb3c9a9_Group%205650.png'/>
            <h1 className='font-bold text-lg'> Sign In To Join Community </h1>
            <p className='text-sm'> Join Umar & Team </p>

        <SyncLoader color="purple " loading={true}  className='align-center text-center ml-auto mt-10'/>
        <h3> Loading ....</h3>
        </div>

    </div>

          </div>


      </div>
    )
  }

  return (
    <>
    {!user ? (
      <LoginPage/>
    ):(
      <BrowserRouter>
      <Header />
      <div className="h-[100vh] flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Chat/>}>
           
          </Route>
  
        </Routes>
      </div>
  <ToastContainer/>
    </BrowserRouter>
    )}
 
    </>
  );
}

export default App;