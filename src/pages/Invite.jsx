import React from 'react';
import { Invitation } from '../components/Invitations';
import { collection, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

function Invite() { 
    const [user] = useAuthState(auth);
    let content;

    if (user) {
        const roomReference = collection(db, "invitations");
        const q = query(roomReference, where("invitedUser", "==", user.email));
        const [invites] = useCollection(q);



        // Printing
        if(invites?.docs.length > 0){
            content = invites.docs.map(doc => {
                let {roomId} = doc.data();
                return(

                    <Invitation key={doc.id}  invitedRoom={roomId} {...doc.data()} />
                )
        });
        } else {
            content = <p>No Invitations</p>;
        }
    
    } 

    return (
        <div className='mt-16 flex justify-center items-center flex-1'>
            {content}
        </div>
    );
}

export default Invite;
