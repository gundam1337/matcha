import { IoArrowBackCircleSharp } from "react-icons/io5";



//FIXME : the get back is not working in the case of the conv
//1.1 - add the get back and make it functionnal

const ChatHeader = ({ user, onBack }) => {
    //console.log("user in that chat header ", user);
    
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

export default ChatHeader ; 
  