import { Add, FiberManualRecord } from '@mui/icons-material'
import React, { useState } from 'react'
import CreateIcon from '@mui/icons-material/Create';
import SideBarOption from '../components/SideBarOption';
import InsertComment from '@mui/icons-material/InsertComment';
import { Apps, BookmarkBorder, Drafts, ExpandLess, ExpandMore, FileCopy, Inbox, PeopleAlt } from '@mui/icons-material';
import {  addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function Sidebar() {
  const [user] =  useAuthState(auth);
  const roomsCollectionRef = collection(db, "rooms");

  // Query 
  const roomsQuery = query(
    roomsCollectionRef,
    where(`members.${user.uid}`, '==', true),  // Check if the user is a member
    // where('creator', '==', user.uid)   ,        // OR check if the user is the creator
  );
  
  // Use the Firebase hook to listen to the collection
  const [channels, loading, error] = useCollection(roomsQuery);
  const [isShowMoreOpen , SetShowMoreOpen] = useState(false)

  
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


  
  return (
    <div  style={{ flex: 0.3, borderTop: '1px solid #49274b', overflow: 'hidden' }}
    className="bg-slack mt-[56px] text-white h-full overflow-y-auto hidden md:block">
    
                     {/* Header */}

      <div style={{ borderBottom: `1px solid #49274b` }} className=" flex p-3 mt-12">
        <div className="info flex-1 ">
          <h1 className="text-2xl font-bold mb-1 ml-1"> Dev Flex </h1>
          <h3 className=" text-sm flex items-center">
            <FiberManualRecord className="text-green-800 text-[10px] mt-[1px] mr-[1px]" />
            {user?.displayName}
          </h3>
        </div>
        <CreateIcon className="bg-white p-1 rounded-full text-2xl text-[#49274b]" />
      </div>

                      {/* Sidebar Options */}

      {/* dummy data for now */}
      <SideBarOption Icon={InsertComment} title="Threads"/>
      <SideBarOption Icon={Inbox} title="Mentions & Reactions"/>


        {isShowMoreOpen ? (
          <>
          <SideBarOption Icon={Drafts} title="Drafts"/>
          <SideBarOption Icon={BookmarkBorder} title="Channel browser"/>
          <SideBarOption Icon={PeopleAlt} title="People & user groups"/>
        <button onClick={()=> SetShowMoreOpen(false)} className='pl-3 h-12 text-lg'> {<ExpandLess/>} Show Less </button>
          </>
        ):  
        <button onClick={()=> SetShowMoreOpen(true)} className='pl-3 h-12 text-lg'> {<ExpandMore/>} Show More </button>
        }
      

      <hr className='opacity-20 my-2'/>

   
          <button className='text-lg font-bold w-full' onClick={addChannel}>  {<Add  fontSize="small" style={{ padding: 1 }}/>} Add Channel </button>
      {channels?.docs.map((doc)=>(
        <SideBarOption
        key={doc.id}
        id={doc.id}
        title={doc.data().name}
        isCreator={user.uid === doc.data().creator}
        />
      ))}

    </div>
  );
}

export default Sidebar