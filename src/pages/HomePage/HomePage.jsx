import { useEffect, useState } from "react";
import AnimatedLoader from "../../components/AnimatedLoader/AnimatedLoader";
import Cards from "./components/Cards/Cards";
import NavigationBar from "./components/NavBar/Navigation";
import Connect from "./components/Connect/Connect";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";


//TODO the CSS for the loader is not working 
function HomePage() {
  const [cssLoaded, setCssLoaded] = useState(false);
  const [currentView, setCurrentView] = useState("Home");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // <div>
    //   {cssLoaded ? (
    //     <>
    //       <NavigationBar />
    //       <div className="container">
    //         {currentView === 'Home' && <Cards />}
    //         {(!isMobile || currentView === "Messages") && <Connect />}
    //       </div>
    //       <BottomNavBar onNavItemClicked={setCurrentView} />
    //     </>
    //   ) : (
    //     <AnimatedLoader />
    //   )}
    // </div>
    <AnimatedLoader />
  );
}

export default HomePage;
