import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faStar, faHeart } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import axiosInstance from "../../../../API/axiosConfig";
import { useSelector } from "react-redux";

//THIS IS JUST FOR RENDRING THE USERS DATA

const UserProfileCard = ({ matches }) => {
  if (!matches || Object.keys(matches).length === 0) {
    return <div>Loading...</div>; // Show loading or some other placeholder
  }

  // console.log("inside the card",matches)
  return (
    <div className="photo">
      <img
        src={matches.profile.profilePicture}
        alt={`${matches.username} profile`}
      />

      <div className="photo-text">
        <div className="photo-name-and-age">
          <h2>{matches.username}</h2>
          <h3>22</h3>
          <p>{matches.profile.location.city}</p>
        </div>

        <div className="photo-bio">{matches.bio}</div>
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
  const user = useSelector((state) => state.data);
  const [matches, setMatches] = useState([]);
  const [swipeCount, setSwipeCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  //NOTE : this is depending on the user data that is existed in the redux store

  const fetchUsers = async () => {
    try {
      const username = user.data.username;
      console.log("a new request to the server");
      const res = await axiosInstance.post("/findMatches", { username });
      if (res) {
        setMatches(res.data);
        setSwipeCount(0); // Reset swipe count after fetching new users
      } else {
        console.error("Fetch failed: Empty response");
      }
      console.log("the request is sent to server");
    } catch (error) {
      console.error("Error fetching new users:", error);
    }
  };

  // Use useEffect to trigger fetchUsers when user.data.profile is available
  useEffect(() => {
    if (user && user.data && user.data.profile) {
      console.log("the current user data", user.data.username);
      fetchUsers(); // Fetch new users
    }
  }, [user]); // Only run when user state changes

  const handleSwipe = async (action) => {
    try {
      await axiosInstance.post("/swipe", {
        username: user.data.username,
        action,
        targetUsername: matches[currentIndex].username,
      });

      // Increment index to show the next user
      if (currentIndex < matches.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        fetchUsers(); // If no more users, fetch again
      }
    } catch (error) {
      console.error("Error during swipe:", error);
    }
  };

  return (
    <main>
      <div className="photo-and-actions">
        {matches.length > 0 && (
          <UserProfileCard matches={matches[currentIndex]} />
        )}
        <SwipeActions onSwipe={handleSwipe} />
      </div>
    </main>
  );
};

export default Cards;
