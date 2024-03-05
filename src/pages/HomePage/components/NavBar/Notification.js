//Notification dorp down
import { useState } from "react";

//NOTE : Notification Types : matches,messages,likes,visitors
//TODO: to add the dopdown at the notification system


const NotificationItem = ({ imageUrl, mainText, subText, time }) => (
  <div className="notify_item">
    <div className="notify_img">
      <img src={imageUrl} alt="profile_pic" style={{ width: '50px' }} />
    </div>
    <div className="notify_info">
      <p>{mainText}<span>{subText}</span></p>
      <span className="notify_time">{time}</span>
    </div>
  </div>
);

const DropdownNotifications = () => (
  <div className="dropdown">
    <NotificationItem
      imageUrl="./not_1.png"
      mainText="Alex commented on"
      subText="Timeline Share"
      time="10 minutes ago"
    />
    <NotificationItem
      imageUrl="./not_2.png"
      mainText="Ben hur commented on your"
      subText="Timeline Share"
      time="55 minutes ago"
    />
  </div>
);


const Notification = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  return (
    <div className="notification">
      <i className="uil uil-bell" onClick={toggleDropdown}></i>
      <small className="notification-count">9+</small>

      {isDropdownVisible && (
        <DropdownNotifications></DropdownNotifications>
      )}
    </div>
  );
};

export default Notification;
