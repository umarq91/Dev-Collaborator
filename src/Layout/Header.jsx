import React, { useEffect, useRef } from 'react'
import { Avatar } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutLine from '@mui/icons-material/HelpOutline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { Logout } from '@mui/icons-material';
import { doc, setDoc } from 'firebase/firestore';



const Header = () => {

 const [user] = useAuthState(auth);
 const userRef = doc(db, "users", user?.uid);

 

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

 },[userRef])




  return (
    // Container
    <div className='flex fixed w-full items-center justify-between py-2 text-white bg-slack *:'>

                                     {/* Header Left */}
            <div style={{flex:0.3}} className='flex items-center ml-5 '>
                <Avatar src={user?.photoURL} alt='user photo' className='cursor-pointer hover:opacity-80' />

                <AccessTimeIcon className='ml-auto mr-[30px]'/>

            </div>


                                         {/* Header center (Search) */}

            <div style={{ flex: 0.4, backgroundColor: '#421f44',opacity:1 ,color:'gray'  }} className=" flex overflow-hidden text-center rounded-md px-[50px] border-gray-800"> 
              <SearchIcon/>
              {/* input here */}      
              </div>

           

                                            {/* Header Right */}

        <div style={{flex:0.3}} className="right  flex items-end hover:cursor-pointer"  onClick={handleLogout}>

          <Logout  className='ml-auto '/>
            <span className='mr-5 '> Logout </span>
        </div>

    </div>

  )
}

export default Header