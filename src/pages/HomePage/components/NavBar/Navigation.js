import styles from "../../style/NavBar/Navigation.module.css";
import Logo from "./Logo";
import Search from "./Search";
import UserProfileCard from "./UserProfileCard";
import Notifcation from "./Notification";
const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div claseName = {styles.container}>
        {/* logo */}
        <Logo></Logo>
        {/* search bar */}
        <Search></Search>
        {/* Notifcation */}
        <Notifcation></Notifcation>
        {/* profile component */}
        <UserProfileCard></UserProfileCard>
      </div>
    </div>
  );
};

export default Navbar;

