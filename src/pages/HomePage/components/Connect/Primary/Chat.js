import React, { useState, useEffect, useContext } from "react";
import { MyContext } from '../../../../../context/NavigationProvider';

import ChatHeader from "./chat/ChatHeader";
import ChatHistory from "./chat/ChatHistory";

const Chat = ({ selectedConversation, onBack }) => {
  const { selectedMatched } = useContext(MyContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    console.log("from the useEffect of useContext", selectedMatched);

    const newUser = selectedMatched
      ? {
          username: selectedMatched.username,
          photo: Array.isArray(selectedMatched.profilePicture) && selectedMatched.profilePicture.length > 0
            ? selectedMatched.profilePicture[0]
            : null,
        }
      : selectedConversation
      ? {
          username: selectedConversation.senderName,
          photo: selectedConversation.profilePhoto,
        }
      : {};

    newUser.status = "online";
    setUser(newUser);
  }, [selectedMatched, selectedConversation]);

  return (
    <div>
      <ChatHeader user={user} onBack={onBack}></ChatHeader>
      <ChatHistory></ChatHistory>
    </div>
  );
};

export default Chat;
