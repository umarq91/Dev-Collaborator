import React, { useEffect, useRef, useState } from 'react'
import { Avatar } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutLine from '@mui/icons-material/HelpOutline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { Logout } from '@mui/icons-material';
import { collection, doc, getDocs, query, setDoc, where } from 'firebase/firestore';
import { Invitation } from '../components/Invitations';
import InviteRequrestModal from '../components/Modals/InviteRequrestModal';
import { useCollection } from 'react-firebase-hooks/firestore';
import NotificationsIcon from '@mui/icons-material/Notifications';


const Header = () => {

 const [user] = useAuthState(auth);
 const userRef = doc(db, "users", user?.uid);
  const [inviteCount,setInviteCount] = useState(0)
  const [inviteModal,setInviteModal] = useState(false)

 
  const invitationRef = query(collection(db, "emailInvites"), where("invitedUser", "==", user.email));

    // Using useCollection to listen for real-time updates
    const [invitations, loading, error] = useCollection(invitationRef);

    const invites = invitations ? invitations.docs.map(doc => ({ id: doc.id, ...doc.data() })) :[]


// Requests









 let  handleOnlineStatus = async(status)=>{
  // update the use Online status
  await setDoc(userRef,{
    isOnline: status 
  },{merge : true})
 }



 const handleLogout = async()=>{
  handleOnlineStatus(false);
  auth.signOut();
 }


 useEffect(()=>{

const handleOnline = () => {
  handleOnlineStatus(true);
};

 handleOnline(); //setting the online status to true if the use is logged in and turned the window tab back ON 
  
  window.addEventListener('beforeunload',()=>handleOnlineStatus(false))  // it sets to offline when screen turns off

  setInviteCount(invites.length)
 },[userRef])




  return (
    // Container
    <div className='flex fixed w-full items-center justify-between py-2 text-white bg-gray-800  border-b-2 border-gray-700 :'>

                                     {/* Header Left */}
            <div style={{flex:0.3}} className='flex items-center ml-5 '>
                <Avatar src={user?.photoURL} alt='user photo' className='cursor-pointer hover:opacity-80' />

                <AccessTimeIcon className='ml-auto mr-[30px]'/>

            </div>


                                         {/* Header center (Search) */}

            <div style={{ flex: 0.4,opacity:1 ,color:'gray'  }} className=" flex bg-blue-600 overflow-hidden text-center rounded-md px-[50px] border-gray-800"> 
              {/* <SearchIcon/> */}
              {/* input here */}      
              </div>

           

                                            {/* Header Right */}
    <div className="flex gap-10">

        <button className='ml-auto relative ' onClick={()=>setInviteModal(true)}>
        <NotificationsIcon />
          <span className="absolute top-0 -right-1 bg-red-500 text-white rounded-full text-[13px] h-4 w-4 flex items-center justify-center"> {inviteCount}</span>
      </button>


          {inviteModal && <InviteRequrestModal invites={invites} isOpen={inviteModal} onClose={()=>setInviteModal(false) } />}
        <div style={{flex:0.3}} className="right  flex items-end gap-3 hover:cursor-pointer"  onClick={handleLogout}>
          <Logout  className='ml-auto '/>
            <span className='mr-5 '> Logout </span>
        </div>
    </div>

    </div>

  )
}

export default Header