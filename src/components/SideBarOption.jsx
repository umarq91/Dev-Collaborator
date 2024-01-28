import React from 'react'
import InsertComment from '@mui/icons-material/InsertComment';
import { auth, db } from '../firebase';
import {  addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../redux/appSlice';
import { useAuthState } from 'react-firebase-hooks/auth';


function SideBarOptions({Icon,title,addChannelOption,id}) {
const dispatch = useDispatch();
const roomsCollectionRef = collection(db, "rooms");   // Reference to the 'rooms' collection
const [user] = useAuthState(auth)




const addChannel = () => {
  // todo : instead add a modal for asking this and return the error if criteria doesn't match
  const channelName = prompt("Please enter a Room Name");

  if (channelName.length < 4) return;  // Ensuring the channel name meets a minimum length requirement

  addDoc(roomsCollectionRef, {
    name: channelName,
    createdAt: serverTimestamp(),
    creator: user.uid,  // Stores who made this room
    members: {
      [user.uid]: true  // Initialize the creator as a member
    }
  });
};


const selectChannel =()=>{
  if(id){
    dispatch(enterRoom({
      roomId:id
    }))
  }
}

  return (
    <div className='flex text-sm items-center pl-[2px] p-1 cursor-pointer hover:bg-[#340e36] hover:opacity-90 ml-4 gap-2'
    onClick={addChannelOption ? addChannel : selectChannel}
    >

        
{Icon && <Icon fontSize="small" style={{padding:1}}  /> }
{
  Icon ? (
    <h3 className='text-lg font-semibold'> {title} </h3>
  ) : (
    <div className="div px-2 text-lg font-light">
      <span className='p-4'>#</span> {title}
    </div>
  )
}

    </div>
  )
}

export default SideBarOptions