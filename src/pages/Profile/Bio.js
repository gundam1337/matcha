import React, { useState } from "react";
import "./bio.css";

const Bio = () => {
  const [bio, setBio] = useState("");
  const maxLength = 300;

  // Update the bio state and ensure it doesn't exceed maxLength
  const handleChange = (event) => {
    if (event.target.value.length <= maxLength) {
      setBio(event.target.value);
    }
  };

  return (
    <div className="bioStyles">
      <h2> Bio</h2>
      <textarea
        value={bio}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder="I'm a software engineer..."
      />
      <div className="countStyles">
        {bio.length} / {maxLength}
      </div>
    </div>
  );
};

export default Bio;
