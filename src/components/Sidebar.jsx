import { Add, FiberManualRecord } from '@mui/icons-material'
import React from 'react'
import CreateIcon from '@mui/icons-material/Create';
import SideBarOption from './SideBarOption';
import InsertComment from '@mui/icons-material/InsertComment';
import { Apps, BookmarkBorder, Drafts, ExpandLess, ExpandMore, FileCopy, Inbox, PeopleAlt } from '@mui/icons-material';
import {  addDoc, collection, getDocs } from 'firebase/firestore';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '../firebase';

function Sidebar() {

  const roomsCollectionRef = collection(db, "rooms");

  // Use the Firebase hook to listen to the collection
  const [channels, loading, error] = useCollection(roomsCollectionRef);

  


  return (
    // container

    <div
      style={{ flex: 0.3, borderTop: ` 1px solid #49274b` }}
      className="bg-slack mt-[56px] text-white "
    >
      {/* Header */}
      <div style={{ borderBottom: `1px solid #49274b` }} className=" flex p-3">
        <div className="info flex-1 ">
          <h1 className="text-2xl font-bold mb-1 ml-1"> Dev Flex </h1>
          <h3 className=" text-sm flex items-center">
            <FiberManualRecord className="text-green-800 text-[10px] mt-[1px] mr-[1px]" />
            Umar Qureshi
          </h3>
        </div>
        <CreateIcon className="bg-white p-1 rounded-full text-2xl text-[#49274b]" />
      </div>

      {/* Sidebar Options */}

      <SideBarOption Icon={InsertComment} title="Threads"/>
      <SideBarOption Icon={Inbox} title="Mentions & Reactions"/>
      <SideBarOption Icon={Drafts} title="Drafts"/>
      <SideBarOption Icon={BookmarkBorder} title="Channel browser"/>
      <SideBarOption Icon={PeopleAlt} title="People & user groups"/>
      <SideBarOption Icon={Apps} title="Apps"/>
      <SideBarOption Icon={FileCopy} title="File browser"/>
      <SideBarOption Icon={ExpandLess} title="Show less"/>
      <hr className='opacity-20 my-2'/>
      
      <SideBarOption Icon={ExpandMore} title="Show More"/>
 

      <hr className='opacity-20 my-2'/>
      <SideBarOption addChannelOption Icon={Add} title={'Add Channel'}/>
     

     
      {channels?.docs.map((doc)=>(
        <SideBarOption
        key={doc.id}
        id={doc.id}
          title={doc.data().name}/>
      ))}


    </div>
  );
}

export default Sidebar