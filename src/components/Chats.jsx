import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data() || {}); // Ensure default to empty object
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.filter(([chatId, chat]) => chat.userInfo) // Filter out entries without userInfo
        ?.sort((a, b) => (b[1]?.date || 0) - (a[1]?.date || 0))
        .map(([chatId, chat]) => (
          <div
            className="userChat"
            key={chatId}
            onClick={() => handleSelect(chat?.userInfo)}
          >
            <img src={chat?.userInfo?.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{chat?.userInfo?.displayName}</span>
              <p>{chat?.lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Chats;
