import React, {useState } from "react";

import ConversationHistory from "./History";
import Chat from "./Chat";


const Primary = ({ selectedMatch }) => {
  //console.log("selectedMatch", selectedMatch);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleBack = () => {
    setSelectedConversation(null);
  };

  //console.log("conversation:", selectedConversation);

  return (
    <div>
      {selectedMatch || selectedConversation ? (
        <Chat 
          selectedMatch={selectedMatch} 
          selectedConversation={selectedConversation} 
          onBack={handleBack}
        />
      ) : (
        <ConversationHistory onSelectConversation={handleSelectConversation} />
      )}
    </div>
  );
};


export default Primary;
