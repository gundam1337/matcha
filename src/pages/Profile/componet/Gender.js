import React from 'react';

const Gender = ({ setFieldValue }) => {
  const handleGenderChange = (e) => {
    setFieldValue('gender', e.target.value);
  };

  return (
    <div className="gender radio">
      <h4>Your gender :</h4>
      <div>
        <label>
          <input 
            type="radio" 
            name="gender" 
            value="man" 
            onChange={handleGenderChange} 
          />
          <span>Man</span>
        </label>
      </div>

      <div>
        <label>
          <input 
            type="radio" 
            name="gender" 
            value="woman" 
            onChange={handleGenderChange} 
          />
          <span>Woman</span>
        </label>
      </div>
    </div>
  );
};

export default Gender;
