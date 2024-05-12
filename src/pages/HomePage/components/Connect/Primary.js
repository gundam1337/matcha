import React, { useEffect, useState } from 'react';
import axios from 'axios';


//load 10 old messages
//for all the last hsitory 

const History = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get('/api/messages');
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="chat">
      {messages.map((message, index) => (
        <div key={index} className="message">
          <div className="profile-photo">
            <img src={message.profilePhoto} alt="" />
          </div>
          <div className="message-body">
            <h5>{message.senderName}</h5>
            <p className="text-muted">{message.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const Chat = () => {
  //send and recive messages and render them  

};

const Primary = () => {
  return (
    <div>
      <div className="message">
        <div className="profile-photo">
          <img src="./images/profile-17.jpg" alt="" />
        </div>
        <div className="message-body">
          <h5>Edem Quist</h5>
          <p className="text-muted">Just woke up bruh</p>
        </div>
      </div>

      <div className="message">
        <div className="profile-photo">
          <img src="./images/profile-6.jpg" alt="" />
        </div>
        <div className="message-body">
          <h5>Daniella Jackson</h5>
          <p className="text-bold">2 new messages</p>
        </div>
      </div>
    </div>
  );
};

export default Primary;
