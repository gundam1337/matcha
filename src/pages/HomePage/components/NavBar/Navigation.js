import styles from "../../style/NavBar/Navigation.module.css";
import Logo from "./Logo";
import Search from "./Search";
import UserProfileCard from "./UserProfileCard";
const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      {/* logo */}
      <Logo></Logo>
      {/* search bar */}
      <Search></Search>
      {/* profile component */}
      <UserProfileCard></UserProfileCard>
      {/* Notifcation */}
      
    </nav>
  );
};

export default Navbar;
