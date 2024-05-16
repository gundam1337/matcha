import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../API/axiosConfig";

//load all the conversation and the least meessages

const History = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get("/chat_history");
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="chat">
      {/* {messages.map((message, index) => (
        <div key={index} className="message">
          <div className="profile-photo">
            <img src={message.profilePhoto} alt="" />
          </div>
          <div className="message-body">
            <h5>{message.senderName}</h5>
            <p className="text-muted">{message.text}</p>
          </div>
        </div>
      ))} */}
    </div>
  );
};

const Chat = ({ selectedMatch }) => {
  //send and recive messages and render them
  console.log("the selected matched ", selectedMatch);
};

const Primary = ({ selectedMatch }) => {
  return (
    <div>
      <History selectedMatch={selectedMatch}></History>
    </div>
  );
};

export default Primary;
