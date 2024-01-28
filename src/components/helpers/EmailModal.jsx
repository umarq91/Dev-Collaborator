import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react';
import { auth, db } from '../../firebase';
import { useSelector } from 'react-redux';
import { selectRoomId } from '../../redux/appSlice';
import { useAuthState } from 'react-firebase-hooks/auth';

const EmailModal = ({ isOpen, onClose }) => {

  const roomId = useSelector(selectRoomId)
  const [user] = useAuthState(auth)
  const [email, setEmail] = useState('');
  const InvitationRef = collection(db,'invitations')
  if (!isOpen) return null;




  const handleSubmit = async() => {
    console.log('Email submitted:', email);
   await addDoc(InvitationRef,{
      roomId : roomId,
      invitedBy : user.email,
      invitedUser: email,
      status:'pending',
      timeStamp : serverTimestamp() 
    })
    console.log("Working");
    onClose();
    // Add here the logic you want to perform with the email
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50">
      <div className="max-w-sm mx-auto my-20 p-5 bg-white">
        <h2 className="text-lg">Enter User Email for Invitation.</h2>
        <input 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email address" 
          className="w-full p-2 my-2 border border-gray-300"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
          <button onClick={onClose} className="px-4 py-2 bg-red-500 text-white rounded">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EmailModal;
