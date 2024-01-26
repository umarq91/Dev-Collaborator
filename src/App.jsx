import React from 'react';
import {Route, BrowserRouter,Routes } from 'react-router-dom';
import Home from './Home';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Chat from './components/Chat';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { Login } from '@mui/icons-material';
import LoginPage from './components/LoginPage';


function App() {

  const [user, loading, error] = useAuthState(auth);
  console.log(user);
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
    </BrowserRouter>
    )}
 
    </>
  );
}

export default App;