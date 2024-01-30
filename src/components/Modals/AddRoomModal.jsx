import React, { useState } from 'react'

const AddRoomModal = ({ isOpen, setModalOpen ,addChannel })=> {
    const [roomName, setRoomName] = useState('');
    const [roomType, setRoomType] = useState('public'); 

    const [error,setError] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(roomName , roomType);
        if(roomName === '' || roomType === '') {    
            setError(true)
            return;
        } 
        
        
       
        addChannel(roomName,roomType)
        setModalOpen(false); // Close modal after submission
        setRoomName('')
        setRoomType('')
        setError(false)
      };
    
      if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black  bg-opacity-40 flex justify-center items-center text-black">
     <div className="bg-white h-96 w-96 rounded-lg flex flex-col items-center">
        <h1 className="text-2xl  text-black w-full font-bold text-center py-2 rounded-t-lg">
          Create a room
        </h1>
      <form onSubmit={handleSubmit} className='mt-10'>
        <div className=''>
          <label htmlFor="roomName" className="block text-lg font-semibold  text-gray-700 text-center">
            Chat Room Name
          </label>
          <input
            type="text"
            id="roomName"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="my-2 block  py-2 px-4 font-semibold  w-72 rounded-md border-black border-2 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />

            <span className="block text-lg  text-gray-700  my-4 font-semibold ">Room Type</span>
<div className="mb-4 flex gap-10">
            <div className="flex items-center">
              <input
                id="public"
                name="roomType"
                type="radio"
                value="public"
                checked={roomType === 'public'}
                onChange={(e) => setRoomType(e.target.value)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label htmlFor="public" className="ml-3 block text-sm font-medium text-gray-700">
                Public
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="private"
                name="roomType"
                type="radio"
                value="private"
                checked={roomType === 'private'}
                onChange={(e) => setRoomType(e.target.value)}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label htmlFor="private" className="ml-3 block text-sm font-medium text-gray-700">
                Private
              </label>
            </div>
            </div>  
        </div>
        <div className="mt-10 pl-2 ">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-slack py-2  px-4 text-sm font-medium text-white shadow-sm hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Create Room
          </button>
          <button
            type="submit"
            onClick={()=>setModalOpen(false)}
            className="inline-flex justify-center rounded-md border border-transparent bg-slack  py-2 ml-2 px-6  text-sm font-medium text-white shadow-sm hover:opacity-85 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
          Cancel
          </button>
        </div>
      
         {error &&  <h2 className='pt-5 font-semibold text-red-700 text-lg text-center'> complete the info! </h2>}   


          
            </form>
    </div>
  </div>
  )
}

export default AddRoomModal