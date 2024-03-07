import { useEffect, useState } from "react";
import NavigationBar from "./components/NavBar/Navigation";
import AnimatedLoader from "../../components/AnimatedLoader/AnimatedLoader";
import Cards from "./components/Cards/Cards";

function HomePage() {
  const [cssLoaded, setCssLoaded] = useState(false);

  useEffect(() => {
    // Create a link element for the CSS file
    const cssLink = document.createElement("link");
    cssLink.href = "/Homepage.css";  
    cssLink.rel = "stylesheet";
    cssLink.type = "text/css";
    cssLink.id = "auth-css";  

    cssLink.onload = () => setCssLoaded(true);

    // Append the link element to the head
    document.head.appendChild(cssLink);

    // Cleanup function to remove the link element when the component unmounts
    return () => {
      const existingLink = document.getElementById("auth-css");
      if (existingLink) {
        existingLink.remove();
      }
    };
  }, []);

  return (
    <>
      {!cssLoaded && <AnimatedLoader />}
      <NavigationBar></NavigationBar>
      <Cards></Cards>
    </>
  );
}

export default HomePage;
