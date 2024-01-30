import React from 'react';
import { db } from '../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { doc } from 'firebase/firestore';


function Message({ message, user, userId, userImage, createdAt, isAdmin }) {

  
  const userDocRef = doc(db, 'users', userId);
   const [userSnapshot] = useDocument(userDocRef);
   
   
   // Extract the isOnline status from the document snapshot
   const isOnline = userSnapshot?.data()?.isOnline;

  return (
    <div className='flex items-center p-[10px]'>
      <img src={userImage} alt='user image' width={60} className='rounded-lg border-2 border-black' />
      {/* Info */}
      <div className="pl-2">
        {isAdmin && <h2 className='text-sm text-green-600'> Creator </h2>}
        <h3 className='font-bold'>
          {user + '  '}

          {/* // Green dot indicating online status */}
          {isOnline && <span className='text-green-500'>&#9679;</span>} 
          <span className='text-gray-400 text-sm ml-2 font-light'>
            {createdAt && new Date(createdAt.toDate()).toLocaleString()}
          </span>
        </h3>
        <p>{message}</p>
      </div>
    </div>
  );
}

export default Message;