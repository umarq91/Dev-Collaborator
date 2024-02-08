import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebase';
import { useDispatch } from 'react-redux';
import { enterRoom } from '../redux/appSlice';
import Chat from '../Layout/Chat';
import { doc, getDoc } from 'firebase/firestore';
import Sidebar from '../Layout/Sidebar';

const Rooms = () => {
    const params = useParams(); // Extracting the id parameter
    const [inviteValid, setInviteValid] = useState(false);
    const [loading, setLoading] = useState(true);
    const [user] = useAuthState(auth);
    let dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        const checkRoomExists = async () => {
            const roomRef = doc(db, "rooms", params.id);
            const docSnap = await getDoc(roomRef);

            if (docSnap.exists()) {
                setInviteValid(true);
                dispatch(enterRoom({
                    roomId: params.id
                }));
            } else {
                setInviteValid(false);
            
            }
            setLoading(false);
        };

        if (params.id) {
            checkRoomExists();
        }
    }, [params.id, dispatch]); // Add params.id and dispatch to dependency array if they are not stable

    if (loading) {
        return <div className='bg-gray-800 flex w-full justify-center items-center text-white'>Loading...</div>;
    }

 return (
        inviteValid ? (
            <div className='h-full w-full flex'>
                <div className="hidden md:block ">

                <Sidebar />
                </div>
                <Chat />
            </div>
        ) : (
            <div className='flex-1 flex justify-center items-center'>Room does not exist or invite is invalid.</div>
        )
    );
};

export default Rooms;
