import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate,useLocation } from 'react-router-dom';
import { auth, db } from '../firebase';
import { collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../redux/appSlice';
import { toast } from 'react-toastify';

export const Invitation = ({invitedRoom}) => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const roomId = queryParams.get('room');
  const [user] = useAuthState(auth);
  const userUid = user.uid;
  const dispatch = useDispatch()
  const roomRef = doc(db,'rooms',invitedRoom)
  

 // for deleting the request from database after joining the room
 const invitationRef = query(collection(db, "invitations"), where("invitedUser", "==", user.email), where("roomId", "==", invitedRoom));



  const acceptInvitationByLink = async () => {
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



  const acceptInvitationByEmail = async () => {
    try {
      const roomSnap = await getDoc(roomRef);
      const roomData = roomSnap.data();
  
      roomData.members[user.uid] = true;
      await updateDoc(roomRef, { members: roomData.members });
      toast.success("Added in Room : " + roomData.name);
  
      // Assuming invitationRef is defined correctly
      const invitationSnap = await getDocs(invitationRef);

      invitationSnap.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });
    } catch (error) {
      console.error("Error in accepting invitation: ", error);
      toast.error("Error in accepting invitation");
    }
  };
  
  
  return (
    <div>
      <h1>Accept Invitation</h1>
      <button className='bg-green-500 p-4' onClick={acceptInvitationByEmail}>Join Room</button>
    </div>
  );
};