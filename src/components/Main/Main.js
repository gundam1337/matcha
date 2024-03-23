import React, { useEffect, useState } from "react";
import queryString from "query-string";
import Typed from "typed.js";
import Modal from "react-modal";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
import ResetPassword from "../ResetPassword/ResetPassword";

//TODO 1:if there is no conxion ,display an error message

Modal.setAppElement("#root");

const isMobile = window.innerWidth <= 950;
const customStyles = {
  content: {
    top: "50%",
    left: isMobile ? "0%" : "50%", // Full width for mobile
    right: isMobile ? "0%" : "auto",
    bottom: "auto",
    marginRight: isMobile ? "0%" : "-50%",
    transform: isMobile ? "translate(6%, -50%)" : "translate(-50%, -50%)",
    padding: "0px",
    border: "10px",
    margin: "0px",
    borderRadius: "25px",
    width: isMobile ? "90%" : "auto", // Full width for mobile
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
};

const TYPED_OPTIONS = {
  strings: ["Push for a Match", "Find love"],
  typeSpeed: 60,
  backSpeed: 40,
  loop: true,
};

// Consider moving customStyles to a separate file if they are substantial.

export const ModalButton = ({ label, handleOpen }) => (
  <button className="primary-button" onClick={handleOpen}>
    {label}
  </button>
);

export const AppModal = ({ isOpen, handleClose, children }) => (
  <Modal isOpen={isOpen} onRequestClose={handleClose} style={customStyles}>
    {children}
  </Modal>
);

export default function Main() {
  const [isRegistrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const handleModal = (setter) => () => setter((prev) => !prev);

  useEffect(() => {
    if (window.location.hash === "#login") {
      setLoginModalOpen(true);
    }
    if (window.location.hash.includes("#Reset")) {
      setIsResetPassword(true);
    }
    const queryParams = queryString.parse(window.location.search);
    if (queryParams.openLogin) {
      setIsVerified(true);
    }
  }, []);

  useEffect(() => {
    const typed = new Typed(".slogan-app", TYPED_OPTIONS);

    return () => typed.destroy();
  }, []);

  return (
    <main>
      <div className="screen">
        <div className="home">
          <h1>Matcha</h1>
          <h2>
            <span className="slogan-app"></span>
          </h2>
         
          <div>
          <ModalButton
            label="Create account"
            handleOpen={handleModal(setRegistrationModalOpen)}
          />
          <AppModal
            isOpen={isRegistrationModalOpen}
            handleClose={handleModal(setRegistrationModalOpen)}
          >
            <Registration onClick={handleModal(setRegistrationModalOpen)} />
            
          </AppModal>
          </div>
          <br></br>
          <div>
          <ModalButton
            label="login"
            handleOpen={handleModal(setLoginModalOpen)}
          />
          <AppModal
            isOpen={isLoginModalOpen}
            handleClose={handleModal(setLoginModalOpen)}
          >
            <Login
              onClick={handleModal(setLoginModalOpen)}
              isVerified={isVerified}
            />
          </AppModal>
          </div>

          {/* NOTE : rest password  */}
          <AppModal
            isOpen={isResetPassword}
            handleClose={handleModal(setIsResetPassword)}
          >
            <ResetPassword />
          </AppModal>
        </div>
      </div>
    </main>
  );
}
