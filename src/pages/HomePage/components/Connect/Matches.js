//NOTE : style
//TODO : add fixed size to the image in the css

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const user = useSelector((state) => state.data);

  const username = user.data.username;
  //TODO : add an error handler for this task 
  console.log("the user data inside the ", username);

  //DONE : send the current user ID to use it in the endpoint
  //TODO : determine the the format depending on the UI

  useEffect(() => {
    const url = `http://localhost:3001/matches?username=${encodeURIComponent(
      username
    )}`;
    const eventSource = new EventSource(url);

    eventSource.onmessage = (event) => {
      //const data = JSON.parse(event.data);

      console.log("data from the match route", event.data);

      // if (data.operationType === "insert" || data.operationType === "update") {
      //   setMatches((prevMatches) => [...prevMatches, data.fullDocument]);
      // }
      // Add other operation types as necessary (delete, replace, etc.)
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    //display the data
    <div className="message">
      <div className="profile-photo">
        <img src="" alt="" />
      </div>
      <div className="message-body">
        <h5>Edem Quist</h5>
        <p className="text-muted"> today at 12:45</p>
      </div>
    </div>
  );
};

export default Matches;
