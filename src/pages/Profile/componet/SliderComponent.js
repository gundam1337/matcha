import React, { useState, useEffect } from 'react';
//import "../style/SliderComponent.css"


export const Distance = ({ setFieldValue }) => {
  const [distance, setDistance] = useState(30);

  useEffect(() => {
    // Update the Formik state with the default distance value on component mount
    setFieldValue("distance", distance);
  }, [setFieldValue, distance]);

  const handleDistanceChange = (e) => {
    const newDistance = e.target.value;
    setDistance(newDistance);
    setFieldValue("distance", newDistance); // Update the Formik state
  };

  return (
    <div>
      <div className="slider-container">
        <label htmlFor="distance">Maximum Distance ({distance} KM)</label>
        <input
          type="range"
          id="distance"
          min="1"
          max="100"
          value={distance}
          onChange={handleDistanceChange}
        />
      </div>
    </div>
  );
};



export const DualRangeSlider = ({ setFieldValue }) => {
  const [ageRange, setAgeRange] = useState({ min: 18, max: 60 });

  // useEffect(()=>{
  //   setFieldValue("targetAge.minAge", 18);
  //   setFieldValue("targetAge.maxAge", 60); 
  // },[ageRange,setFieldValue])

  const handleMinAgeChange = (e) => {
    const minValue = e.target.value ? Math.min(Number(e.target.value), ageRange.max) : 18;
    setAgeRange((prev) => ({ ...prev, min: minValue }));
    setFieldValue("targetAge.minAge", minValue); // Update the Formik state for minAge
  };

  const handleMaxAgeChange = (e) => {
    const maxValue = e.target.value ? Math.max(Number(e.target.value), ageRange.min) : 60;
    setAgeRange((prev) => ({ ...prev, max: maxValue }));
    setFieldValue("targetAge.maxAge", maxValue); // Update the Formik state for maxAge
  };

  return (
    <div className='dual-slider-container'>
        <label htmlFor="ageRange">Age Range: {ageRange.min} - {ageRange.max}</label>
        <input
          type="range"
          id="minAge"
          min="18"
          max="60"
          value={ageRange.min}
          onChange={handleMinAgeChange}
        />
        <br/>
        <input
          type="range"
          id="maxAge"
          min="18"
          max="60"
          value={ageRange.max}
          onChange={handleMaxAgeChange}
        />
    </div>
  );
};
