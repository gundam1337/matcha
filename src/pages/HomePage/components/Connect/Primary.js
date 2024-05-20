import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../API/axiosConfig";

//load all the conversation and the least meessages
//store the fetched conversation data in a global state
//add Loading.. if the conversation is not complet

const History = () => {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get("/chat_history");

        console.log("response ->", response.data);

        // Process the response data to extract necessary information
        const processedConversations = response.data.map((conversation) => {
          const lastMessage = conversation.lastMessage;
          const participant = conversation.participants[0];

          return {
            profilePhoto: participant.profile.profilePicture[0],
            senderName: participant.username,
            text: lastMessage.text,
          };
        });

        setConversations(processedConversations);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="chat">
      {conversations.map((conversation, index) => (
        <div key={index} className="message">
          <div className="profile-photo">
            <img src={conversation.profilePhoto} alt="Profile" />
          </div>
          <div className="message-body">
            <h5>{conversation.senderName}</h5>
            <p className="text-muted">{conversation.text}</p>
          </div>
        </div>
      ))}
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
