
import React, { useEffect,useState } from 'react';
import Main from "../../components/Main/Main";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
//FIXME : this Animated loader is not looking great at the registration stage
import AnimatedLoader from "../../components/AnimatedLoader/AnimatedLoader"

const Authentication = () => {

  const [cssLoaded, setCssLoaded] = useState(false);
  
  useEffect(() => {
    // Create a link element for the CSS file
    const cssLink = document.createElement('link');
    cssLink.href = '/Authentication.css'; // Adjust the path as needed
    cssLink.rel = 'stylesheet';
    cssLink.type = 'text/css';
    cssLink.id = 'auth-css'; // An ID to easily locate the element

    cssLink.onload = () => setCssLoaded(true);

    // Append the link element to the head
    document.head.appendChild(cssLink);

    // Cleanup function to remove the link element when the component unmounts
    return () => {
      const existingLink = document.getElementById('auth-css');
      if (existingLink) {
        existingLink.remove();
      }
    };
  }, []);

  return (
    <>
      {!cssLoaded && <AnimatedLoader />}
      <Navbar />
      <Main />
      <Footer />
    </>
  );
};

export default Authentication;