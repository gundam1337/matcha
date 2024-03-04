//TODO create a Modal that show profile and log out
import { useState, useEffect, useRef } from "react";

const ProfileCardData = () => {
  return (
    <div id="card">
      <h1>John Doe</h1>
      <div className="image-crop">
        <img
          id="avatar"
          src="https://drive.google.com/uc?id=1EVA3KUBLxCXF2EGmTf4LUB8F4yAvBrjl"
          alt="John Doe"
        />
      </div>
      <div id="bio">
        <p>
          Hello, my name is John! Bacon ipsum dolor amet short ribs prosciutto
          strip steak, pig ham tongue buffalo beef ribs hamburger pork venison.
        </p>
      </div>
      <div id="stats">
        <div className="col">
          <p className="stat">108</p>
          <p className="label">Posts</p>
        </div>
        <div className="col">
          <p className="stat">457</p>
          <p className="label">Followers</p>
        </div>
        <div className="col">
          <p className="stat">229</p>
          <p className="label">Following</p>
        </div>
      </div>
      <div id="buttons">
        <button>Follow</button>
        <button id="msg">Message</button>
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
        {/* <button onClick={onClose}>Close</button> */}
        {children}
      </div>
    </div>
  );
};

const UserProfileCard = () => {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  return (
    <>
      <div className="profile" onClick={openModal}>
        <label className="btn btn-primary" htmlFor="create-post">
          UserName
        </label>
      </div>

      <Modal show={showModal} onClose={closeModal}>
        <ProfileCardData></ProfileCardData>
      </Modal>
    </>
  );
};

export default UserProfileCard;
