import React from 'react'

function Message({message,user,userImage,createdAt}) {
  return (
    <div className='flex items-center p-[10px]'>
     
     <img src={userImage} alt='user image'  width={60}  className='rounded-lg border-2 border-black'/>
            {/* Info */}
            <div className="pl-2">
                <h3 className='font-bold'>
                    {user + '  '}
                    <span
                    className='text-gray-400 text-sm ml-2 font-light'
                    >   {createdAt && new Date(createdAt.toDate()).toLocaleString()} </span>
                </h3>
                <p>{message}</p>
            </div>
    </div>
  )
}

export default Message