import { InfoOutlined, StarBorderOutlined } from '@mui/icons-material';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectRoomId } from '../redux/appSlice';
import ChatInput from './ChatInput';

function Chat() {

    const roomId= useSelector(selectRoomId)


  return (
    <div style={{ overflowY: "scroll", flexGrow: 1, flex: 0.7 }} className="mt-16">
   
                                      {/* HEADER */}

      <div className="flex justify-between  p-5 border-b-gray-500">

        {/* Header Left */}
        <div className="flex items-center">
          <h3 className='flex lowercase mr-2'>
            <strong> #Room-name </strong>
          </h3>
          <StarBorderOutlined  className='ml-2 text-lg'/>
        </div>


        {/* Header Right */}
        <div className="flex items-center self-center text-sm">
            <p>
                <InfoOutlined className='mb-1'/> Details
            </p>
        </div>


      </div>




                                    {/* Chat Messages */}
    <div className="div">

    {/* Listing Messages Here */}
    </div>

    {/* Chat input */}
        <ChatInput 
        channelId={roomId}
        />   


    </div>
  );
}

export default Chat