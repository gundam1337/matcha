import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

//FIXME : each time I render this compon
//FIXME : the CROS problem in the request 
//useMemo for prevantiong the re-rendring 


const Matches = ({ setMatchesCount ,onMatchClick}) => {
  const [matches, setMatches] = useState([]); // State to store the matches
  const user = useSelector((state) => state.data);

  useEffect(() => {
    const username = user?.data?.username; // Safely access username
    if (!username) {
      console.error("Username is not defined");
      return;
    }
    const url = `http://localhost:3001/matches?username=${encodeURIComponent(
      username
    )}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data); //
      console.log("data ", eventData);
      if (eventData.type === "existed_match") {
        setMatches(eventData.details); // Set the initial matches
      } else if (eventData.type === "new_match") {
        setMatches((prevMatches) => {
          const updatedMatches = [...prevMatches, eventData.details];
          setMatchesCount(updatedMatches.length); // Update count on receiving new match
          return updatedMatches;
        });
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [user]);

  return (
    <div className="scrollable-container">
      {matches.map((match) => (
        <div key={match.username} className="message" onClick={() => onMatchClick(match)}>
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
