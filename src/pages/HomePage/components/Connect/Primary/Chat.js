import React, { useState } from "react";

//this will contain 3 component 

//1 - is for get back and display the user info
//2 - is for the chat history and receving new msg 
//3 - is for the sending msg

const simulatedChatData = [
  {
    id: 1,
    participants: [{ id: 1, username: "User1", profile: { profilePicture: ["user1.jpg"] } }],
    lastMessage: { text: "Hello!" },
    messages: [
      { senderName: "User1", text: "Hello!" },
      { senderName: "User2", text: "Hi there!" }
    ]
  },
  {
    id: 2,
    participants: [{ id: 2, username: "User2", profile: { profilePicture: ["user2.jpg"] } }],
    lastMessage: { text: "How are you?" },
    messages: [
      { senderName: "User2", text: "How are you?" },
      { senderName: "User1", text: "I'm good, thanks!" }
    ]
  }
];

const History = ({ onSelectConversation }) => {
  const [conversations, setConversations] = useState(simulatedChatData);

  return (
    <div className="chat">
      {conversations.map((conversation, index) => (
        <div
          key={index}
          className="message"
          onClick={() => onSelectConversation(conversation)}
        >
          <div className="profile-photo">
            <img src={conversation.participants[0].profile.profilePicture[0]} alt="Profile" />
          </div>
          <div className="message-body">
            <h5>{conversation.participants[0].username}</h5>
            <p className="text-muted">{conversation.lastMessage.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Chat = ({ selectedMatch }) => {
  const [messages, setMessages] = useState(selectedMatch.messages);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const newMsg = { senderName: "CurrentUser", text: newMessage };
    setMessages((prevMessages) => [...prevMessages, newMsg]);
    setNewMessage("");
  };

  return (
    <div className="chat-container">
      <h2>Chat with {selectedMatch.participants[0].username}</h2>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <div className="message-body">
              <h5>{message.senderName}</h5>
              <p>{message.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

const Primary = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  return (
    <div>
      {selectedConversation ? (
        <Chat selectedMatch={selectedConversation} />
      ) : (
        <History onSelectConversation={handleSelectConversation} />
      )}
    </div>
  );
};

export default Primary;
