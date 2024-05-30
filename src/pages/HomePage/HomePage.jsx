import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchData } from '../../Rudex/UserSlice/fetchUserData';
import useDynamicCSSLoader from './Hooks/useDynamicCSSLoader';
import useWindowSize from './Hooks/useWindowSize';

import AnimatedLoader from "../../components/AnimatedLoader/AnimatedLoader";
import Cards from "./components/Cards/Cards";
import NavigationBar from "./components/NavBar/Navigation";
import Connect from "./components/Connect/Connect";
import BottomNavBar from "./components/BottomNavBar/BottomNavBar";

import socketService from "../../API/SocketService"

//FIXME : this code cause the re-rendring

function HomePage() {
  const dispatch = useDispatch();
 
  useEffect(()=>{
    socketService.connect();
  },[])


  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const cssLoaded = useDynamicCSSLoader("/Homepage.css", "auth-css");
  const isMobile = useWindowSize();
  const [currentView, setCurrentView] = useState("Home");

  return (
    <div>
      {cssLoaded ? (
        <>
          <NavigationBar />
          <div className="container">
            {currentView === "Home" && <Cards />}
            {(!isMobile || currentView === "Messages") && <Connect />}
          </div>
          <BottomNavBar onNavItemClicked={setCurrentView} />
        </>
      ) : (
        <AnimatedLoader />
      )}
    </div>
  );
}

export default HomePage;
