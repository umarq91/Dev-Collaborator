import React from 'react'
import InsertComment from '@mui/icons-material/InsertComment';
import { auth, db } from '../firebase';
import {  addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../redux/appSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
function SideBarOptions({Icon,title,addChannelOption,id,isCreator}) {
const dispatch = useDispatch();
const [user] = useAuthState(auth)




const selectChannel =()=>{
  if(id){
    dispatch(enterRoom({
      roomId:id
    }))
  }
}


const leaveRoom =async ()=>{
  if (!id || !user) return; // Check if roomId and user are available

  try {
    const roomRef = doc(db, "rooms", id);
    const roomSnap = await getDoc(roomRef);

    if (roomSnap.exists()) {
      const roomData = roomSnap.data();

      // Remove the user from the members object
      delete roomData.members[user.uid];

      // Update the room document
      await updateDoc(roomRef, { members: roomData.members });
      console.log(`User ${user.uid} left the room ${id}`);
    } else {
      console.log("Room does not exist");
    }
  } catch (error) {
    console.error("Error leaving room: ", error);
  }
}


const deleteRoom = async (roomId, e) => {
  e.stopPropagation(); // Stop event propagation to prevent triggering selectChannel
  try {
    dispatch(enterRoom({ roomId: null })); // Update state after successful deletion
    const roomRef = doc(db, "rooms", roomId);
    await deleteDoc(roomRef);
    console.log(`Room with ID ${roomId} has been deleted.`);
  } catch (error) {
      console.error("Error deleting room: ", error);
    }
};



  return (
    <div className='flex text-sm items-center pl-[2px] p-1 cursor-pointer hover:bg-[#340e36] hover:opacity-90 ml-4 gap-2'
   
    >
{
      Icon ? (
        <div className="flex items-center">
          <Icon fontSize="small" style={{ padding: 1 }} />
          <h3 className='text-lg font-semibold'> {title} </h3>
        </div>
      ) : (
        <div className="div px-2 text-lg font-light flex justify-around  w-full items-center" onClick={selectChannel}> 
        <h3 className='p-1'>#</h3> 
        <div className='flex-1'>{title}</div> {/* Wrap the title */}
        {isCreator ? (
         <button 
         title='delete this room'
         onClick={(event) => deleteRoom(id, event)} className=' text-sm  hover:text-red-700'><DeleteIcon style={{ fontSize: '18px' }} /> </button>
        ) :
        <button 
        title='Leave this room'
        onClick={(event) => leaveRoom(id, event)} className=' text-sm  hover:text-red-700'><LogoutIcon style={{ fontSize: '18px' }} /> </button>
       
        }
      </div>
      
      )
    }

    </div>
  )
}

export default SideBarOptions