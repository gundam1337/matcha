import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axiosInstance from "../../../../API/axiosConfig";

//THIS IS JUST FOR RENDRING THE USERS DATA

// const UserProfileCard = ({ user }) => (
//   <div className="photo">
//     <img src={user.photoUrl} alt={`${user.name} profile`} />

//     <div className="photo-text">
//       <div className="photo-name-and-age">
//         <h2>{user.name}</h2>
//         <h3>{user.age}</h3>
//         <p>{user.location}</p>
//       </div>

//       <div className="photo-bio">{user.bio}</div>
//     </div>
//   </div>
// );

const UserProfileCard = ({ users }) => {
  //destruct the user
  return (
    <div className="photo">
      <img
        src="https://fr.web.img6.acsta.net/c_310_420/pictures/15/11/10/14/58/490093.jpg"
        alt=""
      />

      <div className="photo-text">
        <div className="photo-name-and-age">
          <h2>Lorem</h2>
          <h3>21</h3>
          <p>Morocco, beni mellal</p>
        </div>

        <div className="photo-bio">chess player</div>
      </div>
    </div>
  );
};

const SwipeActions = ({ onSwipe }) => (
  <div className="actions">
    <div className="action" onClick={() => onSwipe("dislike")}>
      <FontAwesomeIcon className="dislike" icon={faTimes} />
    </div>
    <div className="action" onClick={() => onSwipe("superlike")}>
      <FontAwesomeIcon className="superlike" icon={faStar} />
    </div>
    <div className="action" onClick={() => onSwipe("like")}>
      <FontAwesomeIcon className="like" icon={faHeart} />
    </div>
  </div>
);

const Cards = () => {
  const [users, setUsers] = useState([]);
  const [swipeCount, setSwipeCount] = useState(0);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get("/findMatches");
      if (res && res.data) {
        setUsers(res.data);
        setSwipeCount(0); // Reset swipe count after fetching new users
      } else {
        console.error("Fetch failed: Empty response");
      }
    } catch (error) {
      console.error("Error fetching new users:", error);
    }
  };

  const handleSwipe = async (action) => {
    setSwipeCount((prev) => {
      const newCount = prev + 1;

      if (newCount % 10 === 0) {
        fetchUsers(); // Fetch new users after every 10 swipes
      }

      return newCount;
    });

    try {
      const response = await axiosInstance.post("/swipe", {
        action,
      });

      console.log("Swipe successful:", response.data);
    } catch (error) {
      console.error("Error during swipe:", error);
    }
  };

  return (
    <main>
      <div className="photo-and-actions">
        <UserProfileCard users={users} />
        <SwipeActions onSwipe={handleSwipe} />
      </div>
    </main>
  );
};

export default Cards;
