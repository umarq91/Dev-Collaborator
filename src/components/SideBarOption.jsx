import React from 'react'
import InsertComment from '@mui/icons-material/InsertComment';


function SideBarOptions({Icon,title}) {
  return (
    <div className='flex text-sm items-center pl-[2px] p-1 cursor-pointer hover:bg-[#340e36] hover:opacity-90 ml-4 gap-2'>
        
{Icon && <Icon fontSize="small" style={{padding:1}}  /> }
{
  Icon ? (
    <h3 className='text-lg font-semibold'> {title} </h3>
  ) : (
    <div className="div">
      <span className='p-4'>#</span> {title}
    </div>
  )
}

    </div>
  )
}

export default SideBarOptions