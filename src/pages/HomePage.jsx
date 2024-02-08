import React from 'react'
import Sidebar from '../Layout/Sidebar'
import Chat from '../Layout/Chat'


const HomePage = () => {
  return (
<div className='h-full  w-full flex bg-green-400'>

    <Sidebar/>

{/* to hide it on small screen  */}
<div className="hidden sm:flex flex-1"> 
    <Chat/>
</div>

</div>
  )
}

export default HomePage