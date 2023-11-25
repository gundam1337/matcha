import React, { useState } from 'react';
import "./SliderComponent.css"

export const SliderComponent = () => {
  const [distance, setDistance] = useState(30);

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
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
export const DualRangeSlider = () => {
  const [ageRange, setAgeRange] = useState({ min: 18, max: 60 });

  const handleMinAgeChange = (e) => {
    const minValue = Math.min(Number(e.target.value), ageRange.max );
    setAgeRange((prev) => ({ ...prev, min: minValue }));
  };

  const handleMaxAgeChange = (e) => {
    const maxValue = Math.max(Number(e.target.value), ageRange.min );
    setAgeRange((prev) => ({ ...prev, max: maxValue }));
  };
  return (
    <div className='dual-slider-container'>
        <label htmlFor="ageRange">Age Range: {ageRange.min} - {ageRange.max}</label>
        <input
          type="range"
          id="minAge"
          min = "18"
          max= "60"
          value={ageRange.min}
          onChange={handleMinAgeChange}
        />
        <br/>
        <input
          type="range"
          id="maxAge"
          min = "18"
          max="60"
          value={ageRange.max}
          onChange={handleMaxAgeChange}
        />
    </div>
  );
};
