import React from "react";
import { Link } from 'react-router-dom';


export default function Navbar()
{
function volet() {
    var hamburgerMenu = document.querySelector(".menu-hamburger");
    var navbarLinks = document.querySelector(".links-navbar");
    navbarLinks.classList.toggle("mobile-menu");
    hamburgerMenu.classList.toggle("open");
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
          <a href="login.html" class="secondary-button">Login</a>
        </li>
      </ul>
    </div>
    <div class="menu-hamburger" onClick={volet} style={{ cursor: 'pointer' }}>
      <div class="button-burger-menu"></div>
    </div>
  </nav>
);
};