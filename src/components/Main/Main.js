import React, { useEffect, useState } from "react";
import Typed from "typed.js";
import Modal from "react-modal";
import Registraction from "../Registration/Registration";
import "./Main.css"

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
    margin : "0px",
    borderRadius: "25px",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
};

export default function Main() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    const options = {
      strings: ["Push for a Match", "Find love"],
      typeSpeed: 90,
      backSpeed: 30,
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

              <Registraction onClick={closeModal}></Registraction>
          </Modal>
        </div>
      </div>
    </main>
  );
}
