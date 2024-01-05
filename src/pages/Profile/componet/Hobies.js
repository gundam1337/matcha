import React from 'react';

const Hobbies = ({ setFieldValue, values }) => {
  const handleCheckboxChange = (hobby) => {
    // Check if the hobby is already in the array
    if (values.hobbies.includes(hobby)) {
      // Remove the hobby from the array
      setFieldValue('hobbies', values.hobbies.filter((h) => h !== hobby));
    } else {
      // Add the hobby to the array
      setFieldValue('hobbies', [...values.hobbies, hobby]);
    }
  };

  const hobbiesList = [
    "cooking", "sport", "reading", "music", "dance",
    "astronomy", "gardening", "photography", "travel",
    "cinema", "video-games", "drawing", "animals"
  ];

  return (
    <div>
      <h4>Your Hobbies :</h4>
      <div className="hobbies radio">
        {hobbiesList.map(hobby => (
          <div key={hobby}>
            <label>
              <input
                type="checkbox"
                name="user-hobbies"
                value={hobby}
                checked={values.hobbies.includes(hobby)}
                onChange={() => handleCheckboxChange(hobby)}
              />
              <span>{hobby.charAt(0).toUpperCase() + hobby.slice(1)}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hobbies;
