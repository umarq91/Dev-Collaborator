import React, { useEffect, useState } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import {  useParams } from 'react-router-dom';
import { auth } from '../firebase';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../redux/appSlice';
import Chat from '../Layout/Chat';

const Rooms = () => {
    const params = useParams(); // Extracting the id parameter

    const [inviteValid, setInviteValid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [id] = useAuthState(auth)
    let dispatch = useDispatch()
  
    useEffect(() => {
   console.log(params.id);
      if(params.id){
        dispatch(enterRoom({
          roomId:params.id
        }))
      }
    }, []);

    
  return (
   <Chat/>
  )
}

export default Rooms