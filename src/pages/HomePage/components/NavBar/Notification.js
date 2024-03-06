//Notification dorp down
import { useState,useEffect,useRef } from "react";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";

//NOTE : Notification Types : matches,messages,likes,visitors

//Match : New Match Alert!
//likes : [Username] has liked your profile! See who's interested in you."
//visitors "Someone's checking you out! [Username] recently visited your profile."

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
  const wrapperRef = useRef(null); // Ref for the wrapper element


  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };
  
  const handleClose = () => setDropdownVisible(false);

  useOutsideAlerter(wrapperRef, handleClose);


  return (
    <div className="notification" ref={wrapperRef}>
      <i className="uil uil-bell" onClick={toggleDropdown}></i>
      <small className="notification-count">9+</small>

      {isDropdownVisible && (
        <DropdownNotifications></DropdownNotifications>
      )}
    </div>
  );
};

export default Notification;
