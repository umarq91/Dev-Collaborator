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

      await addDoc(messagesRef, {
        message: inputMessage,
        createdAt: serverTimestamp(),
        user: user?.displayName,
        userImage: user?.photoURL,
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
        <input
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Message #${channelName}`}
          className="fixed bottom-8 w-[60%] rounded-md p-5 outline-none border border-gray-300"
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
