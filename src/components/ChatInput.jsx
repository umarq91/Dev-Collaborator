import { Button } from '@mui/material'
import { collection } from 'firebase/firestore'
import React, { useRef, useState } from 'react'
import { db } from '../firebase'
import { doc, getDoc,addDoc } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';



function ChatInput({channelId,channelName}) {
const [inputMessge,setInputMessage] = useState('')
 

    const sendAmessage=async(e)=>{
        e.preventDefault();

        const channelRef = doc(db, 'rooms', channelId);
      
          const messagesRef = collection(db, 'rooms', channelId, 'messages');
       
         
          await addDoc(messagesRef, {
            message: inputMessge,
            createdAt: serverTimestamp()
            // include other message fields like timestamp, user info, etc.
          });
      
          console.log('Message added!');
          setInputMessage('')
    
     
    }


  return (
    <div className="rounded-xl ">
      <form className="flex relative justify-center">
        <input
        value={inputMessge}
        onChange={(e)=>setInputMessage(e.target.value)}
          placeholder={`Message #${channelId}`}
          className="fixed bottom-8 w-[60%] rounded-md p-5 outline-none border border-gray-300"
        />
        <Button
          hidden
          type="submit"
          onClick={sendAmessage}
          style={{ display: "none" }}> SEND </Button>
      </form>
    </div>
  );
}

export default ChatInput