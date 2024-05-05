//NOTE : style
//TODO : add fixed size to the image in the css

import { useState, useEffect } from "react";

const Matches = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3001/matches");

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log("data from the match route",data);

      if (data.operationType === "insert" || data.operationType === "update") {
        setMatches((prevMatches) => [...prevMatches, data.fullDocument]);
      }
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
