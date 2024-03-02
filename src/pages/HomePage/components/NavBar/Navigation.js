// import styles from "../../style/NavBar/Navigation.module.css";
// import Logo from "./Logo";
// import Search from "./Search";
// import UserProfileCard from "./UserProfileCard";
// import Notifcation from "./Notification";
// const Navbar = () => {
//   return (
//     <nav className={styles.navbar}>
//       <div claseName = {styles.container}>
//         <Logo></Logo>
//         <Search></Search>
//         <Notifcation></Notifcation>
//         <UserProfileCard></UserProfileCard>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React from 'react';
import styles from '../../style/NavBar/Navigation.module.css';

function Navbar() {
    return (
        <nav className={styles.nav}>
            <div className={styles.container}>
                <h2 className={styles.logo}>
                    mySocial
                </h2>
                <div className={styles.searchBar}>
                    <i className="uil uil-search"></i>
                    <input type="search" placeholder="Search for creators, inspirations, and projects" />
                </div>
                <div className={styles.create}>
                    <label className={`${styles.btn} ${styles.btnPrimary}`} htmlFor="create-post">Create</label>
                    <div className={styles.profilePhoto}>
                        <img src="./images/profile-1.jpg" alt="" />
                    </div>
                </div>
            </div>
        </nav>
    );
}




export default Navbar;
