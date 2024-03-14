import { useEffect, useState } from "react";
import AnimatedLoader from "../../components/AnimatedLoader/AnimatedLoader";
import Cards from "./components/Cards/Cards";
import NavigationBar from "./components/NavBar/Navigation";
import Connect from "./components/Connect/Connect";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";

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
    <div>
      {!cssLoaded && <AnimatedLoader />}
      <NavigationBar></NavigationBar>
      <div className="container">
        <Cards></Cards>
        <Connect></Connect>
      </div>
      <BottomNavBar></BottomNavBar>
      
    </div>
  );
}

export default HomePage;
