import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate,useLocation } from 'react-router-dom';
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../redux/appSlice';

export const Invitation = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const roomId = queryParams.get('room');
  const [user] = useAuthState(auth);
  const userUid = user.uid;
  const dispatch = useDispatch()

  const acceptInvitation = async () => {
    if (roomId && userUid) {
      try {
        const roomRef = doc(db, 'rooms', roomId);
        await updateDoc(roomRef, {
          [`members.${userUid}`]: true
        });

        console.log(`User ${userUid} added to room ${roomId}`);

        dispatch(enterRoom({ roomId: roomId }));  // this to straight Enter the room right after joining
      
        queryParams.delete('room');
        navigate({ search: queryParams.toString() });

        
      } catch (error) {
        console.error('Error adding user to room:', error);
      }
    }
  };

  return (
    <div>
      <h1>Accept Invitation</h1>
      <button className='bg-green-500 p-4' onClick={acceptInvitation}>Join Room</button>
    </div>
  );
};