//Notification dorp down
import { useState,useEffect,useRef } from "react";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";
import socketService from "../../../../API/SocketService"
//NOTE : Notification Types : matches,messages,likes,visitors

//Match : New Match Alert!
//likes : [Username] has liked your profile! See who's interested in you."
//visitors "Someone's checking you out! [Username] recently visited your profile."

const NotificationItem = ({ imageUrl, mainText,time }) => (
  <div className="notify_item">
    <div className="notify_img">
      <img src={imageUrl} alt="profile_pic" style={{ width: '50px' }} />
    </div>
    <div className="notify_info">
      <span className="notify_time">{time}</span>
    </div>
  </div>
);

const DropdownNotifications = ({ notifications }) => {
  // Check if notifications array is empty
  if (notifications.length === 0) {
    return <div className="dropdown">No new notifications.</div>;
  }

  // Render notifications if the array is not empty
  return (
    <div className="dropdown">
      {notifications.map((notification, index) => (
        <NotificationItem
          key={index}
          imageUrl={notification.imageUrl}
          mainText={notification.mainText}
          subText={notification.subText}
          time={notification.time}
        />
      ))}
    </div>
  );
};



const Notification = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const wrapperRef = useRef(null); // Ref for the wrapper element

  //get the user data 

  useEffect(() => {
    // Connect to the socket server
    //socketService.connect();

    //  Listen for initial notifications
    socketService.on('getNotifications',(notification)=>{
      console.log("notifcation",notification)
      setNotifications(notification);
    });

    // Listen for incoming new notifications
    socketService.on('newNotification', (notification) => {
      setNotifications([...notifications, notification]);
    });

    // Cleanup (handle disconnections)
    return () => {
      socketService.off('newNotification');
      socketService.disconnect();
    };
  }, []);



  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  const handleClose = () => setDropdownVisible(false);
  useOutsideAlerter(wrapperRef, handleClose);


  return (
    <div className="notification" ref={wrapperRef}>
      <i className="uil uil-bell" onClick={toggleDropdown}></i>
      <small className="notification-count">{notifications.length}</small>

      {isDropdownVisible && (
        <DropdownNotifications notifications={notifications} />
      )}
    </div>
  );
};

export default Notification;
