import { InfoOutlined, StarBorderOutlined } from '@mui/icons-material';
  import React, { useEffect, useRef } from 'react'
  import { useSelector } from 'react-redux';
  import { selectRoomId } from '../redux/appSlice';
  import ChatInput from './ChatInput';
  import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
  import { db } from '../firebase';
  import { collection, doc,query,orderBy } from 'firebase/firestore';
import Message from './Message';

  function Chat() {
    const chatref = useRef(null)
      const roomId= useSelector(selectRoomId)

      const channelRef = roomId && doc(db, 'rooms', roomId) 
      const messagesRef = roomId && query(collection(db, "rooms", roomId, "messages"),orderBy('createdAt','asc'));


  let [roomDetails] = useDocument(channelRef)
let [roommessages,loading] = useCollection(messagesRef)

useEffect(()=>{

chatref?.current?.scrollIntoView({
  behavior:'smooth'
})

},[roomId,loading,messagesRef])




  return (
    <div style={{ overflowY: "scroll", flexGrow: 1, flex: 0.7 }} className="mt-20">
   
                                      {/* HEADER */}

      <div className="flex justify-between  p-5 border-b-gray-500">

        {/* Header Left */}
        <div className="flex items-center">
          <h3 className='flex lowercase mr-2'>
            <strong> #{roomDetails?.data().name} </strong>
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
                       {roommessages?.docs.map((doc)=>{
                        let {message,createdAt,user,userImage} = doc.data()
                        return(

                          <Message
                          key={doc.id}
                          message={message}
                          userImage={userImage}
                          createdAt={createdAt}
                          user={user}
                          />
                        
                          )})}
    </div>
    <div ref={chatref} className='pb-[60px]'/>
                         {/* Chat input */}
        <ChatInput 
        chatref={chatref} // just sending this so when we send text , screen should automatically scroll down 
        channelId={roomId}
        channelName={roomDetails?.data().name}
        />   




    </div>
  );
}

export default Chat