import React, { useState } from "react";
import { IoArrowBackCircleSharp } from "react-icons/io5";
//this will contain 3 component

//DONE 0- print the user I want to chat with
//DONE 1 - is for get back and display the user info
//1.1 - add the get back and make it functionnal 
//2 - is for the chat history and receving new msg
//3 - is for the sending msg
const ChatHeader = ({ user,onBack }) => {
  console.log("user in that chat header ", user);

  // const onBack = () => {
  //   console.log("going back ... ");
  // };

  return (
    <div className="chat-header">
      <IoArrowBackCircleSharp onClick={onBack} className="back-icon" />
      <img src={user.photo} alt={`${user.name}'s avatar`} className="avatar" />
      <div className="user-info">
        <h2>{user.username}</h2>
        <p>{user.status === "online" ? "Online" : "Offline"}</p>
      </div>
    </div>
  );
};

const ChatHistory = ({ messages }) => {
  return (
    <div className="chat-history">
      {messages.map((message, index) => (
        <div key={index} className="message">
          <p>{message.content}</p>
          <span>{message.timestamp}</span>
        </div>
      ))}
    </div>
  );
};

const ChatInput = ({ sendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage("");
    }
  };

  return (
    <form className="chat-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
};

const Chat = ({ selectedMatch, selectedConversation,onBack }) => {
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
  // console.log("selectedMatch", selectedMatch);
  // console.log("selectedConversation", selectedConversation);
  console.log("user", user);
  return (
    <div>
      <ChatHeader user={user} onBack={onBack}></ChatHeader>
    </div>
  );
};

export default Chat;
