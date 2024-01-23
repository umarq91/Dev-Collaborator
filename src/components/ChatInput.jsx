import { Button } from '@mui/material'
import React from 'react'

function ChatInput({channelId,channelName}) {

    const sendAmessage=(e)=>{
        e.preventDefault();

    }
  return (
    <div className="rounded-xl ">
      <form className="flex relative justify-center">
        <input
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