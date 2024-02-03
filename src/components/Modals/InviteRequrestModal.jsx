import React from 'react';
import { auth, db } from '../../firebase';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

const InviteRequestModal = ({ isOpen, onClose, invitationRef }) => {
  const [user] = useAuthState(auth);
  
  // Using useCollection to listen for real-time updates
  const [invitations, loading, error] = useCollection(invitationRef);

  const invites = invitations ? invitations.docs.map(doc => ({ id: doc.id, ...doc.data() })) :[]

  const acceptInvitationByEmail = async (roomId, invitationId) => {
    const roomRef = doc(db, 'rooms', roomId);

    try {
      const roomSnap = await getDoc(roomRef);
      const roomData = roomSnap.data();

      roomData.members[user.uid] = true;
      await updateDoc(roomRef, { members: roomData.members });
      toast.success("Added in Room: " + roomData.name);

     
      await deleteDoc(doc(db, 'emailInvites', invitationId));
    } catch (error) {
      console.error("Error in accepting invitation: ", error);
      toast.error("Error in accepting invitation");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center text-black">
      <div className="bg-white h-96 w-[55vw] rounded-lg flex flex-col items-center">
        <h1 className="text-2xl text-black w-full font-bold text-center py-2 rounded-t-lg">
          Room Invite Requests
        </h1>
        <button onClick={onClose}>Close</button>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message}</p>}
        {invites.length>0 ?
         invites.map((item) => (
          <div key={item.id} className="w-[80%] my-2 h-14 bg-yellow-400 flex items-center justify-between p-2">
              <div className="left bg flex items-center gap-2 ">
                  <img src='https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D' 
                  className='w-12 h-12 object-cover rounded-full'/>
                  <div className="info">
                        <h5 className='font-bold'> {item?.invitedBy}</h5>
                        <p> Sent you a request </p>
                  </div>
              </div>
            <button className='bg-green-500 text-white p-2' onClick={() => acceptInvitationByEmail(item.roomId, item.id)}>Accept</button>
            
          </div>
        ))
        :
        <div>
          no invitations
           </div>
        }
      </div>
    </div>
  );
};

export default InviteRequestModal;
