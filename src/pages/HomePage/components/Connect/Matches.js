import { useState, useEffect ,useContext} from "react";
import { useSelector } from "react-redux";
import {MyContext} from '../../../../context/NavigationProvider'

//FIXME : the CROS problem in the request 
//useMemo for prevantiong the re-rendring 
//Instead I used some CSS 


const Matches = ({ setMatchesCount }) => {
  const [matches, setMatches] = useState([]); // State to store the matches
  const user = useSelector((state) => state.data);

  const {selectedMatched, setSelectedMatched } = useContext(MyContext);

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

    console.log("the request has sent in the Matches")
    eventSource.onmessage = (event) => {
      const eventData = JSON.parse(event.data); //
      //console.log("data ", eventData);
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
        <div key={match.username} className="message" onClick={() => setSelectedMatched(match)}>
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
