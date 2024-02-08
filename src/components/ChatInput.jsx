import { Button } from '@mui/material';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import React, { useRef, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

function ChatInput({ channelId, channelName, chatref }) {
  const [user] = useAuthState(auth);
  const [inputMessage, setInputMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    chatref?.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatref]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!channelId) {
        return false;
    }
    try {
        const messagesRef = collection(db, "rooms", channelId, "messages");

        // Replace newline characters with a format that can be stored and later retrieved
        const formattedMessage = inputMessage.replace(/\n/g, '\\n');

        await addDoc(messagesRef, {
            message: formattedMessage,
            createdAt: serverTimestamp(),
            user: user?.displayName,
            userImage: user?.photoURL,
            userId: user?.uid
        });

        console.log("Message added!");
        chatref?.current?.scrollIntoView({ behavior: 'smooth' });
        setInputMessage("");
    } catch (err) {
        setError('Failed to send message.');
        console.error(err);
    }
};


  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage(e);
    }
  };

  return (
    <div className="rounded-xl ">
      <form className="flex relative justify-center">

      <textarea
  value={inputMessage}
  onChange={(e) => setInputMessage(e.target.value)}
  onPaste={(e) => setInputMessage(e.clipboardData.getData('text'))}
  onKeyPress={handleKeyPress}
  placeholder={`Message #${channelName}`}
  className="fixed bottom-8 w-[60%] rounded-md  outline-none border bg-gray-300 border-gray-300 text-black resize-vertical" 
  style={{ whiteSpace: 'pre-wrap' }}
/>


        <Button
          type="submit"
          onClick={sendMessage}
          style={{ display: "none" }}> SEND </Button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default ChatInput;