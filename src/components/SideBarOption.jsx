import React, { useState } from 'react'
import InsertComment from '@mui/icons-material/InsertComment';
import { auth, db } from '../firebase';
import {  addDoc, collection, deleteDoc, doc, getDoc, getDocs, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../redux/appSlice';
import { useAuthState } from 'react-firebase-hooks/auth';
import DeleteIcon from '@mui/icons-material/Delete';
import LogoutIcon from '@mui/icons-material/Logout';
import { ConfirmRemoval } from './Modals/ConfirmRemoval';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function SideBarOptions({Icon,title,addChannelOption,id,isCreator}) {
const dispatch = useDispatch();
const [user] = useAuthState(auth);
const navigate = useNavigate()

const [isDeleteModalOpen,setIsDeleteModalOpen] = useState(false)
const [modalAction, setModalAction] = useState(null); // 'delete' or 'leave'


const selectChannel =()=>{
  navigate(`/room/${id}`)
  if(id){
    dispatch(enterRoom({
      roomId:id
    }))
  }
}

const handleAction = async () => {
  if (modalAction === 'delete') {
    await deleteRoom(id);
  } else if (modalAction === 'leave') {
    await leaveRoom(id);
  }
}



const leaveRoom =async ()=>{
  if (!id || !user) return; 
  dispatch(enterRoom({ roomId: null })); 
  
  try {
    const roomRef = doc(db, "rooms", id);
    const roomSnap = await getDoc(roomRef);

    if (roomSnap.exists()) {
      const roomData = roomSnap.data();
  
      // Remove the user from the members object
      delete roomData.members[user.uid];


      await updateDoc(roomRef, { members: roomData.members });
      toast.info('Room Left')
    } 
  } catch (error) {
    console.error("Error leaving room: ", error);
  }
}


const deleteRoom = async () => {
  try {
    dispatch(enterRoom({ roomId: null })); // Update state after successful deletion
    const roomRef = doc(db, "rooms", id);
    await deleteDoc(roomRef);
   toast.info('Room Deleted')
  } catch(error){
      console.error("Error deleting room: ", error);
    }
  
};



  return (
    <div className="flex text-sm items-center p-1 cursor-pointer hover:bg-[#340e36] hover:opacity-90 gap-2 ">
      {Icon ? (
        <div className="flex items-center">
          <Icon fontSize="small" style={{ padding: 1 }} />
          <h3 className="text-lg font-semibold"> {title} </h3>
        </div>
      ) : (
        <div
          className="div px-2 text-lg font-light flex justify-around  w-full items-center"
          onClick={selectChannel}
        >
          <h3 className="p-1">#</h3>
          <div className="flex-1">{title}</div> 
        {/* Delete and Leave button */}
          {isCreator ? (
            <button
              title="Delete this room"
              onClick={() => {
                setModalAction("delete");
                setIsDeleteModalOpen(true);
              }}
              className=" text-sm  hover:text-red-700"
            >
              <DeleteIcon style={{ fontSize: "18px" }} />
            </button>
          ) : (
            <button
              title="Leave this room"
              onClick={() => {
                setModalAction("leave");
                setIsDeleteModalOpen(true);
              }}
              className="text-sm hover:text-red-700"
            >
              {" "}
              <LogoutIcon style={{ fontSize: "18px" }} />{" "}
            </button>
          )}
        </div>
      )}

    <ConfirmRemoval
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleAction}
        action={modalAction}
        id={id}
      />
    </div>
  );
}

export default SideBarOptions