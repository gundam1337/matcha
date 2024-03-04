// import Logo from "./Logo";
import Search from "./Search";
import ProfileCard from "./ProfileCard";
import Notifcation from "./Notification";
const Navbar = () => {
  return (
    <nav>
      <div className="container">
        <div className="logo">
          <div>Matcha</div>
        </div>

        <Search></Search>
        <Notifcation></Notifcation>
        <ProfileCard></ProfileCard>
      </div>
    </nav>
  );
};

export default Navbar;
