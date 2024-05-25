import React, { useState, useEffect } from "react";
import axiosInstance from "../../../../../../API/axiosConfig";

//TODO : send a request to the server that contains the curent user and chatpartner

const ChatHistory = ({ messages }) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fatchingChat = async () => {
      const data = {
        currentUser: "omar",
        chatPartner: "Catherine.Jacobs",
        page: 1,
      };
      console.log("the request sent to the user");
      const fetchChat = await axiosInstance.post("chat-history", data);
      console.log("the fetch chat response =>", fetchChat);
    };

    fatchingChat();
  }, []);

  return (
    <div className="chat-history">
      {/* {messages.map((message, index) => (
          <div key={index} className="message">
            <p>{message.content}</p>
            <span>{message.timestamp}</span>
          </div>
        ))} */}
    </div>
  );
};

export default ChatHistory;
