import { useState, useEffect, useRef } from "react";

const ProfileCardData = () => {
  return (
    <div id="card">
      <h1>User Name</h1>
      <div className="image-crop">
        <img
          id="avatar"
          src="https://drive.google.com/uc?id=1EVA3KUBLxCXF2EGmTf4LUB8F4yAvBrjl"
          alt="John Doe"
        />
      </div>
      <div id="bio">
        <p>Hello, my name is John!</p>
      </div>
      <div id="stats">
        <div className="col">
          <p className="stat">10</p>
          <p className="label">Likes</p>
        </div>
        <div className="col">
          <p className="stat">50</p>
          <p className="label">Matches</p>
        </div>
      </div>
      <div id="buttons">
        <button>Profile</button>
        <button id="msg">Log out</button>
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
