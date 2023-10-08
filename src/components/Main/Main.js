import React, { useEffect, useState } from "react";
import Typed from "typed.js";
import Modal from "react-modal";
import Registration from "../Registration/Registration";
import Login from "../Login/Login";
import { useMediaQuery } from "react-responsive";

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "0",
    margin: "0px",
    borderRadius: "25px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
};

export default function Main() {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpen1, setIsOpen1] = useState(false);
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 500px)" });

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function openModal1() {
    setIsOpen1(true);
  }

  function closeModal1() {
    setIsOpen1(false);
  }

  useEffect(() => {
    const options = {
      strings: ["Push for a Match", "Find love"],
      typeSpeed: 60,
      backSpeed: 40,
      loop: true,
    };

    const typed = new Typed(".slogan-app", options);

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <main>
      <div className="screen">
        <div className="home">
          <h1>matcha</h1>
          <h2>
            <span className="slogan-app"></span>
          </h2>
          <button className="primary-button" onClick={openModal}>
            Create account
          </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
          >
            <Registration onClick={closeModal}></Registration>
          </Modal>
          <br/>
          {isTabletOrMobile && (
            <div>
              <button className="primary-button" onClick={openModal1}>
                login
              </button>
              <Modal
                isOpen={modalIsOpen1}
                onRequestClose={closeModal1}
                style={customStyles}
              >
                <Login onClick={closeModal1}></Login>
              </Modal>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
