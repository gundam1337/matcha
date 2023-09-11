import React from "react";
import { useState } from "react";
import Modal from "react-modal";
import Login from "../Login/Login";

function volet() {
  var hamburgerMenu = document.querySelector(".menu-hamburger");
  var navbarLinks = document.querySelector(".links-navbar");
  navbarLinks.classList.toggle("mobile-menu");
  hamburgerMenu.classList.toggle("open");
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "auto", // Set the desired width (e.g., 50%)
    height: "auto", // Set the desired height (e.g., 50%)
    padding: "0",
    border: "0",
    margin: "0",
    borderRadius: "25px",
    
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)", 
  }
};

export default function Navbar()
{
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


    return ( 
    <nav class="navbar">
    <a class="logo" href="index.html">matcha</a>
    <div class="links-navbar">
      <ul>
        <li>
          <a href="#">Contact Us</a>
        </li>
        <li><a href="#">Q&A ?</a></li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <button class = "secondary-button"onClick={openModal}>Login</button>
          <Modal
           isOpen={modalIsOpen}
           onRequestClose={closeModal}
           style={customStyles}
           shouldCloseOnOverlayClick={true}
          >
              <Login onClick={closeModal}></Login>
          </Modal>
        </li>
      </ul>
    </div>
    <div class="menu-hamburger" onClick={volet} style={{ cursor: 'pointer' }}>
      <div class="button-burger-menu"></div>
    </div>
  </nav>
);
};