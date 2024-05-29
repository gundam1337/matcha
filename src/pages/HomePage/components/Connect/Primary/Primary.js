import React, { useState ,useContext,useEffect} from "react";
import ConversationHistory from "./History";
import Chat from "./Chat";
import {MyContext} from '../../../../../context/NavigationProvider'; 

const Primary = () => {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const {selectedMatched,setSelectedMatched} = useContext(MyContext) 

  useEffect(()=>{
    console.log("from the useEffect of useContext",selectedMatched)
  },[selectedMatched])

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  const handleBack = () => {
    setSelectedConversation(null);
    setSelectedMatched(null)
  };

  const showChat = selectedMatched || selectedConversation ;
  console.log("in primary the selectedMatched is ",selectedMatched);
  console.log("showChat is :",showChat)



  const styles = {
    visible: {
      display: 'block'
    },
    hidden: {
      display: 'none'
    }
  };

  return (
    <div>
      <div style={showChat ? styles.visible : styles.hidden}>
        <Chat
          selectedConversation={selectedConversation}
          onBack={handleBack}
        />
      </div>
      <div style={!showChat ? styles.visible : styles.hidden}>
        <ConversationHistory onSelectConversation={handleSelectConversation} />
      </div>
    </div>
  );
};

export default Primary;
