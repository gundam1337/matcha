import React, { useEffect, useState } from "react";
import axiosInstance from "../../../../../API/axiosConfig";

import History from "./History";
import Chat from "./Chat";


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
