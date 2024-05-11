import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Matches = () => {
  const [matches, setMatches] = useState([]); // State to store the matches
  const user = useSelector((state) => state.data);

  useEffect(() => {
    const username = user?.data?.username; // Safely access username
    if (!username) {
      console.error('Username is not defined');
      return;
    }
    const url = `http://localhost:3001/matches?username=${encodeURIComponent(username)}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data);      //
      console.log("data ", eventData);
      if (eventData.type === 'existed_match') {
        setMatches(eventData.details); // Set the initial matches
      } else if (eventData.type === 'new_match') {
        setMatches(prevMatches => [...prevMatches, eventData.details]); // Append new matches to the existing state
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [user]); // Dependency array includes 'user' to re-run useEffect when user changes

  //TODO : fix the size of the image 
  //TODO : add the date to the matches
  return (
    <div className="scrollable-container">
      {matches.map(match => (
        <div key={match.username} className="message">
          <div className="profile-photo">
            <img src={match.profilePicture[0]} alt={match.firstName} />
          </div>
          <div className="message-body">
            <h5>{`${match.firstName} ${match.lastName}`}</h5>
            <p className="text-muted">Username: {match.username}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Matches;
