import React, { useState } from "react";
// import "../style/bio.css";

const Bio = ({ setFieldValue }) => {
  const [bio, setBio] = useState("");
  const maxLength = 100;

  const handleChange = (event) => {
    const newBio = event.target.value;
    if (newBio.length <= maxLength) {
      setBio(newBio);
      setFieldValue('bio', newBio); // Update the Formik state
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
