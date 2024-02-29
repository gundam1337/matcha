import { useState } from "react";
import "../../style/NavBar/Notification.module.css";



const Notifcation = () => {
  const [notificationCount, setNotificationCount] = useState(5);

  // Function to increment notification count (can be connected to actual events)
  const incrementNotifications = () => {
    setNotificationCount(notificationCount + 1);
  };

  return (
    <div className="notification-bell" onClick={incrementNotifications}>
      <div className="bell-icon" tabIndex="0">
        {notificationCount > 0 && (
        <div className="notification-count">{notificationCount}</div>
      )}
      </div>

     
    </div>
  );
};

export default Notifcation;
