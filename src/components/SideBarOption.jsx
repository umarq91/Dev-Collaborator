import React from 'react'
import InsertComment from '@mui/icons-material/InsertComment';
import { db } from '../firebase';
import {  addDoc, collection, getDocs } from 'firebase/firestore';


function SideBarOptions({Icon,title,addChannelOption}) {

// Reference to the 'rooms' collection
const roomsCollectionRef = collection(db, "rooms");

const addChannel =()=>{

  const channelName = prompt('Please enter a Room Name')
addDoc(roomsCollectionRef,{
  name:channelName
})

}

const selectChannel =()=>{
  
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