import { useState, useEffect, useRef } from "react";
import {useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../../context/AuthProvider";



const ProfileCardData = () => {
  const user = useSelector((state) => state.data);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const showProfile = () => {
    navigate('/profile');
  };

  const handleLogout = () => {
    // Clear access token from local storage
    //localStorage.removeItem('accessToken');

    // Clear refresh token from cookies
    

    // Update global state if necessary (e.g., using context or Redux)
    logout();
    // Redirect to the login page or home page
    navigate('/');
  };

  return (
    <div id="card">
      <h1>{user.data.profile.firstName+" "+ user.data.profile.lastName}</h1>
      <div className="image-crop">
        <img
          id="avatar"
          src={user.data.profile.profilePicture[0]}
          alt="John Doe"
        />
      </div>
      <div id="bio">
        <p>{user.data.profile.bio}</p>
      </div>
      <div id="stats">
        <div className="col">
          <p className="stat">{user.data.likedBy.length}</p>
          <p className="label">Likes</p>
        </div>
        <div className="col">
          <p className="stat">{user.data.matches.length}</p>
          <p className="label">Matches</p>
        </div>
      </div>
      <div id="buttons">
        <button onClick={showProfile}>Profile</button>
        <button id="msg" onClick={handleLogout}>Log out</button>
      </div>
    </div>
  );
};

const Modal = ({ show, children, onClose }) => {
  const modalContentRef = useRef();

  // Event listener to close the modal if clicked outside
  const handleClickOutside = (event) => {
    if (
      modalContentRef.current &&
      !modalContentRef.current.contains(event.target)
    ) {
      onClose();
    }
  };

  useEffect(() => {
    // Attach the listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content" ref={modalContentRef}>
        <div className="close" onClick={onClose}></div>
        {children}
      </div>
    </div>
  );
};

const UserProfileCard = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector((state) => state.data);


  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <>
      <div className="profile" onClick={openModal}>
        <label className="btn btn-primary" htmlFor="create-post">
          {user.data.username}
        </label>
      </div>

      <Modal show={showModal} onClose={closeModal}>
        <ProfileCardData></ProfileCardData>
      </Modal>
    </>
  );
};

export default UserProfileCard;
