import React, { useState, useEffect } from "react";
import io from "socket.io-client";


const socket = io('http://localhost:3001');

const ChatSender = () => {
  const [messageInput, setMessageInput] = useState("");

  const handleMessageInputChange = (event) => {
    setMessageInput(event.target.value);
  };

  const handleSendMessage = () => {
    const messageObject = {
      sender: "user1",
      recipient: "user2",
      message: messageInput,
      timestamp: new Date().toISOString(),
    };
    socket.emit("sendMessage", messageObject);


    //listen to a new messages 
    setMessageInput("");
  };

  return (
    <div>
      <input
        type="text"
        value={messageInput}
        onChange={handleMessageInputChange}
        placeholder="Type your message here"
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
};

export default ChatSender;
