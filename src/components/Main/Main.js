import React, { useEffect ,useState} from "react";
import Login from '../Login/Login';
import Typed from 'typed.js';
import Modal from './Modal';


const [isModalOpen , setisModalOpen] = useState(false);

const handleLoginClick = () => {
  setIsModalOpen(true);
};

const handleModalClose = () => {
  setIsModalOpen(false);
};

export default function Main() {
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
          <h2><span className="slogan-app"></span></h2>
          {/* <a href="register.html" className="primary-button">Create account</a> */}
          <a onClick={handleLoginClick}>Login</a>

        </div>
      </div>
    </main>
  );
}
