import React from 'react'
import { Avatar } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutLine from '@mui/icons-material/HelpOutline';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import { Logout } from '@mui/icons-material';



const Header = () => {

 const [user] =  useAuthState(auth)
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

        <div style={{flex:0.3}} className="right  flex items-end hover:cursor-pointer"  onClick={()=>auth.signOut()}>

          <Logout  className='ml-auto '/>
            <span className='mr-5 '> Logout </span>
        </div>

    </div>

  )
}

export default Header