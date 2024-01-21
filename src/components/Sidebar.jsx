import { FiberManualRecord } from '@mui/icons-material'
import React from 'react'
import CreateIcon from '@mui/icons-material/Create';

function Sidebar() {
  return (
         // container

    <div style={{flex:0.3,borderTop:` 1px solid #49274b`}} className='bg-slack mt-[56px] text-white '>


              {/* Header */}
            <div style={{borderBottom:`1px solid #49274b`}} className=" flex p-3">
                <div className="info flex-1 ">
                    <h1 className='text-2xl font-bold mb-1 ml-1'> Dev Flex </h1> 
                    <h3 className=' text-sm flex items-center'> <FiberManualRecord className='text-green-800 text-[10px] mt-[1px] mr-[1px]'/> 
                        Umar Qureshi
                     </h3>
                </div>
                <CreateIcon  className='bg-white p-1 rounded-full text-2xl text-[#49274b]'/>
            </div>


     </div>

  )
}

export default Sidebar