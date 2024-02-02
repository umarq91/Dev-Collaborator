import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'; // If you're using react-router
import { Timestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function InviteHandler() {
  const location = useLocation();
  const [inviteValid, setInviteValid] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roomId = queryParams.get('room');
    const inviteId = queryParams.get('invite');
    if (roomId && inviteId) {
      verifyInvite(roomId, inviteId);
    } else {
      // Handle error: queryParams are not as expected
      setLoading(false);
    }
  }, [location]);

  const verifyInvite = async (roomId, inviteId) => {
    const inviteRef = doc(db, "linkInvites", inviteId);
    const inviteDoc = await getDoc(inviteRef);
    if (inviteDoc.exists()) {
      const inviteData = inviteDoc.data();
      console.log(inviteData);
      if (inviteData.roomId === roomId) {
        // Check expiration time
        const currentTime = Timestamp.now();
        if (inviteData.expirationTime.toMillis() > currentTime.toMillis()) {
          setInviteValid(true);
          console.log("Yes Valid");
        } else {
          // Invite is expired
        }
      } else {
        // roomId does not match with invite
      }
    } else {
      // Invite does not exist
    }
    setLoading(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!inviteValid) {
    return <div>Invite is not valid or has expired.</div>;
  }

  return (
    <div className='flex justify-center items-center flex-1'>
      {/* Render your room or whatever content is appropriate for a valid invite */}
      {inviteValid ?
       <div>
      Welcome to the room!
       
        </div> : (
            <div>

                Room is Expired!

                </div>
        )}
    </div>
  );
}

export default InviteHandler;