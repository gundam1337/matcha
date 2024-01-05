import React, { useState } from 'react';
import "../style/SliderComponent.css"

export const SliderComponent = ({ setFieldValue }) => {
  const [distance, setDistance] = useState(30);

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

//NOTE ***************************************************************************************

export const DualRangeSlider = ({ setFieldValue }) => {
  const [ageRange, setAgeRange] = useState({ min: 18, max: 60 });

  const handleMinAgeChange = (e) => {
    const minValue = Math.min(Number(e.target.value), ageRange.max);
    setAgeRange((prev) => ({ ...prev, min: minValue }));
    setFieldValue("targetAge.minAge", minValue); // Update the Formik state for minAge
  };

  const handleMaxAgeChange = (e) => {
    const maxValue = Math.max(Number(e.target.value), ageRange.min);
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
