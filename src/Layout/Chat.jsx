    import { InfoOutlined, StarBorderOutlined } from '@mui/icons-material';
    import React, { useEffect, useRef } from 'react'
    import { useSelector } from 'react-redux';
    import { selectRoomId } from '../redux/appSlice';
    import ChatInput from '../components/ChatInput';
    import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
    import { auth, db } from '../firebase';
    import { collection, doc,query,orderBy } from 'firebase/firestore';
    import Message from '../components/Message';
      import { useAuthState } from 'react-firebase-hooks/auth';
      import CopyLinkButton from '../components/helpers/CopyLinkButton';
  import { Invitation } from '../components/Invitations';
  import Invite from '../pages/Invite';
  import ThreeDotsDropdown from '../components/helpers/ThreeDotsDropdown';
  import { useNavigate } from 'react-router-dom';

    function Chat() {
      const navigate = useNavigate()
    

      const chatref = useRef(null);
      const roomId = useSelector(selectRoomId);
      const [user] = useAuthState(auth)
      const channelRef = roomId && doc(db, "rooms", roomId);
      const messagesRef = roomId &&
        query(
          collection(db, "rooms", roomId, "messages"),
          orderBy("createdAt", "asc")
        );

      let [roomDetails] = useDocument(channelRef);
      let [roommessages, loading] = useCollection(messagesRef);
  
      const isCreator = roomDetails?.data()?.creator === user?.uid  

  useEffect(()=>{

  chatref?.current?.scrollIntoView({
    behavior:'smooth'
  })
  },[roomId,loading,messagesRef])




    return (
      <>
    {roomId && roomDetails ? (
      <div
        style={{ overflowY: "scroll", flexGrow: 1, flex: 0.7 }}
        className="mt-28"
      >

                            
                                  {/* HEADER */}

        <div className="flex justify-between  p-5 border-b-gray-500">
        
          {/* Header Left */}
          <div className="flex items-center">
            <h3 className="flex lowercase mr-2">
              <strong> #{roomDetails?.data().name} </strong>
            </h3>
            <StarBorderOutlined className="ml-2 text-lg" />
          </div>


          {/* Header Right */}
          <div className="flex items-center self-center text-sm">
            <p>
              {isCreator &&   <ThreeDotsDropdown/>}
            
            </p>
          </div>
        </div>



                                    {/* Chat Messages */}

        <div className="div">
                          {/* Listing Messages Here */}
          {roommessages?.docs.map((doc) => {
            let { message, createdAt, user, userImage,userId } = doc.data();
            return (
              <Message
                key={doc.id}
                message={message}
                userImage={userImage}
                createdAt={createdAt}
                user={user}
                userId={userId}
                isAdmin={roomDetails?.data().creator === doc.data().userId}
              />
            );
          })}
        </div>
        <div ref={chatref} className="pb-[120px] md:pb-[65px]" />



                                  {/* Chat input */}

        <ChatInput
          chatref={chatref} // just sending this so when we send text , screen should automatically scroll down
          channelId={roomId}
          channelName={roomDetails?.data().name}
        />
      </div>
    )
    :
  (
    <div className=' flex justify-center flex-1 items-center  '>
      <h3 className='text-5xl opacity-15 font-mono'> Create or Select a Room / Channel </h3>

    </div>
  )
        

  }
      

      </>
    );
  }

  export default Chat