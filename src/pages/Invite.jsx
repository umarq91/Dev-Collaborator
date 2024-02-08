import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // If you're using react-router
import { Timestamp, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';

function Invite() {
  const location = useLocation();
  const [inviteValid, setInviteValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const [id] = useAuthState(auth)

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
    const roomRef = doc(db,'rooms',roomId)
    const inviteDoc = await getDoc(inviteRef);
    if (inviteDoc.exists()) {
      const inviteData = inviteDoc.data();
      if (inviteData.roomId === roomId) {
        // Check expiration time
        const currentTime = Timestamp.now();
        if (inviteData.expirationTime.toMillis() > currentTime.toMillis()) {
          setInviteValid(true);
          console.log("yess came");
          await updateDoc(roomRef, {
            [`members.${id.uid}`]: true
          });
          toast.info('Added in Room ')
          navigate(`/room/${roomId}`)
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


  return (
    <div className='flex justify-center items-center flex-1 '>
      {/* Render your room or whatever content is appropriate for a valid invite */}
      {inviteValid ?
       <div>
      Welcome to the room!
       
        </div> : (
            <div>

                Room is expired or not avaiable

                </div>
        )}
    </div>
  );
}

export default Invite;