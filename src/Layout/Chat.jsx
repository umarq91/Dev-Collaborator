import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enterRoom, selectRoomId } from "../redux/appSlice";
import ChatInput from "../components/ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";
import { collection, doc, query, orderBy } from "firebase/firestore";
import Message from "../components/Message";
import { useAuthState } from "react-firebase-hooks/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";

function Chat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const chatref = useRef(null);
  const roomId = useSelector(selectRoomId);
  const [user] = useAuthState(auth);
  const channelRef = roomId && doc(db, "rooms", roomId);
  const messagesRef = roomId && query(collection(db, "rooms", roomId, "messages"), orderBy("createdAt", "asc"));

  let [roomDetails] = useDocument(channelRef);
  let [roomMessages, loading] = useCollection(messagesRef);

  const isCreator = roomDetails?.data()?.creator === user?.uid;

  useEffect(() => {
    chatref?.current?.scrollIntoView({ behavior: "smooth" });
  }, [roomId, roomMessages]);

  const handleBack = () => {
    navigate("/");
    dispatch(enterRoom({ roomId: null }));
  };

  return (
    <>
      {roomId  ? (
        <div style={{ overflowY: "scroll", flexGrow: 1 }} className="mt-10 bg-gray-800 text-white">

          <div className="flex justify-between pt-10 ">
                <div className="flex items-center gap-4">
                  <button onClick={handleBack} className="p-2"><ArrowBackIcon /> Back</button>
                  <h3 className="flex lowercase mr-2 item-center "><strong> #{roomDetails?.data().name} </strong></h3>
                </div>
              </div>

          {/* Conditional rendering for loading state */}
          {loading ? (
            <div className="flex justify-center items-center h-32"><SyncLoader color="white"/></div>
          ) : (
            <div className="div">
              {/* messages heere */}
              {roomMessages?.docs.map((doc) => {
                const { message, createdAt, user, userImage, userId } = doc.data();
                const displayMessage = message.replace(/\\n/g, "\n");
                return (
                  <Message
                    key={doc.id}
                    message={displayMessage}
                    userImage={userImage}
                    createdAt={createdAt}
                    user={user}
                    userId={userId}
                    isAdmin={roomDetails?.data().creator === userId}
                  />
                );
              })}
              <div ref={chatref} className="pb-[120px] md:pb-[120px]" />
            </div>
          )}

          <ChatInput
            chatref={chatref}
            channelId={roomId}
            channelName={roomDetails?.data().name}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-1 bg-gray-800">
          <h3 className="text-xl opacity-15 text-white font-mono">Select a room</h3>
        </div>
      )}
    </>
  );
}

export default Chat;
