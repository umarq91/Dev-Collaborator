import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { db } from '../../firebase';
import { doc, setDoc,Timestamp } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
import { selectRoomId } from '../../redux/appSlice';

function CopyLinkButton() {
  const roomId = useSelector(selectRoomId);
  const [text, setText] = useState("via Link");

  const createInvite = async () => {
    const inviteId = uuidv4(); // Generate a unique identifier for the invite
    const expirationTime = Date.now() + 60 * 60 * 1000; // Set expiration time (60 minutes from now)
    const expirationTimestamp = Timestamp.fromMillis(expirationTime); // Convert to Firestore Timestamp
    const inviteRef = doc(db, "linkInvites", inviteId);

    // Set the invite details in Firestore
    await setDoc(inviteRef, {
      roomId,
      expirationTime:expirationTimestamp
    });

    return inviteId;
  };

  const copyToClipboard = async () => {
    try {
      const inviteId = await createInvite();
      const link = `${import.meta.env.VITE_MY_URL}/invite?room=${roomId}&invite=${inviteId}`;
      
      await navigator.clipboard.writeText(link);
      toast.info('Invite link copied to clipboard!', {
        position: 'bottom-right'
      });
      toast.warning('Link will be expired in 60 Minutes!', {
        position: 'bottom-right'
      });
      setText('Copied');
    } catch (err) {
      toast.error('Failed to copy: ' + err.message);
    }
  };

  return (
    <button className='font-mono mr-3 text-black' onClick={copyToClipboard}>{text}</button>
  );
}

export default CopyLinkButton;