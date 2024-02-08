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
    const params = useParams();
    const [inviteValid, setInviteValid] = useState(false);
    const [loading, setLoading] = useState(true); // Added loading state
    const [user] = useAuthState(auth);
    let dispatch = useDispatch();

    useEffect(() => {
        const checkRoomExists = async () => {
            setLoading(true); // Start loading
            const roomRef = doc(db, "rooms", params.id);
            const docSnap = await getDoc(roomRef);

            if (docSnap.exists()) {
                setInviteValid(true);
                dispatch(enterRoom({
                    roomId: params.id
                }));
            }
            setLoading(false); // Stop loading once data is fetched
        };
        if (params.id) {
            checkRoomExists();
        }
    }, [params.id, dispatch]);

    if (loading) {
        return <div className='flex-1 flex justify-center items-center bg-gray-900'>Loading...</div>; // Show loading indicator
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
            <div className='flex-1 flex justify-center text-white items-center bg-gray-900'>Room does not exist or invite is invalid.</div>
        )
    );
};

export default Rooms;
