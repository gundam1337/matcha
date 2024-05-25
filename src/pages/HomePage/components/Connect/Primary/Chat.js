import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../../API/axiosConfig";

import ChatHeader from "./chat/ChatHeader"
import ChatHistory from "./chat/ChatHistory"
import ChatInput from "./chat/ChatInput"


const Chat = ({ selectedMatch, selectedConversation, onBack }) => {

  const user = selectedMatch
    ? {
        username: selectedMatch.username,
        photo: selectedMatch.profilePicture[0],
      }
    : selectedConversation
    ? {
        username: selectedConversation.senderName,
        photo: selectedConversation.profilePhoto,
      }
    : {};

  user.status = "online";
  return (
    <div>
      <ChatHeader user={user} onBack={onBack}></ChatHeader>
      <ChatHistory></ChatHistory>
    </div>
  );
};

export default Chat;
