import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axiosInstance from "../../../../API/axiosConfig";

//DONE : make each section as separted compont
//DONE : send a request to the server

const UserProfileCard = ({ users }) => {
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

  useEffect(() => {
    fetchUsers();
  }, [swipeCount]); // Fetch new users whenever swipe count is a multiple of 10

  const fetchUsers = async () => {
    const res = await axiosInstance.get(`/matches/`);
    setUsers(res.data);
    setSwipeCount(0); // Reset swipe count after fetching new users
  };

  const handleSwipe = async (action) => {
    // action parameter will be 'left' or 'right'
    // Increment swipe count
    setSwipeCount((prev) => prev + 1);

    try {
      // "userId",
      // "targetUserId",

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
