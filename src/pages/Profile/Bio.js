import React, { useState } from "react";
import "./bio.css";


// Define the styles for the bio component
const bioStyles = {
  position: 'relative',
  backgroundColor: 'white',
  color: 'black',
  padding: '10px',
  borderRadius: '4px',
  maxWidth: '300px',
  margin: '0 auto',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
};

// Define the styles for the character count
const countStyles = {
  position: 'absolute',
  bottom: '10px',
  right: '10px',
  fontSize: '0.8em'
};

// The Bio component
const Bio = () => {
  const [bio, setBio] = useState('');
  const maxLength = 300;

  // Update the bio state and ensure it doesn't exceed maxLength
  const handleChange = (event) => {
    if (event.target.value.length <= maxLength) {
      setBio(event.target.value);
    }
  };

  return (
    <div style={bioStyles}>
      <textarea
        value={bio}
        onChange={handleChange}
        maxLength={maxLength}
        placeholder="I'm a software engineer..."
        style={{ width: '100%', height: '100px', border: 'none' }}
      />
      <div style={countStyles}>
        {bio.length} / {maxLength}
      </div>
    </div>
  );
};


export default Bio;

