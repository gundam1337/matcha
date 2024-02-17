import React, { useEffect, useState } from 'react';

const Gender = ({ setFieldValue ,errors, touched ,initialValues}) => {
  
  const [gender,setGender] = useState('');
  useEffect(()=>{
    //console.log(initialValues)

    if (initialValues)
    {
      setGender(initialValues)
    }
  },[initialValues])
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
            checked={gender === 'man'}
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
            checked={gender === 'woman'}
            onChange={handleGenderChange} 
          />
          <span>Woman</span>
        </label>
      </div>

      {errors.gender && touched.gender && (
        <>
          <p className="infoError">
            {errors.gender && "⚠️ "}
            {errors.gender}
          </p>
        </>
      )}
    </div>
  );
};

export default Gender;
