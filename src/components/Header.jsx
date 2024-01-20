import React from 'react'
import { Avatar } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SearchIcon from '@mui/icons-material/Search';
import HelpOutLine from '@mui/icons-material/HelpOutline';



const Header = () => {
  return (

    <div className='flex fixed w-full items-center justify-between py-2 text-white bg-slack *:'>

                                     {/* Header Left */}
            <div style={{flex:0.3}} className='flex items-center ml-5 '>
                <Avatar className='cursor-pointer hover:opacity-80' />

                <AccessTimeIcon className='ml-auto mr-[30px]'/>

            </div>


                                         {/* Header center (Search) */}

            <div style={{ flex: 0.4, backgroundColor: '#421f44',opacity:1 ,color:'gray'  }} className=" flex overflow-hidden text-center rounded-md px-[50px] border-gray-800"> 
              <SearchIcon/>
              {/* input here */}

              </div>

           

                                            {/* Header Right */}

        <div style={{flex:0.3}} className="right  flex items-end">
          <HelpOutLine className='ml-auto mr-5'/>
        </div>

    </div>

  )
}

export default Header