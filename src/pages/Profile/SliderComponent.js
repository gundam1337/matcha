import React, { useState } from 'react';
import "./SliderComponent.css"

export const SliderComponent = () => {
  const [distance, setDistance] = useState(35);

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


export const DualRangeSlider = () => {
  const [ageRange, setAgeRange] = useState({ min: 32, max: 45 });

  const handleMinAgeChange = (e) => {
    const minValue = Math.min(Number(e.target.value), ageRange.max - 1);
    setAgeRange((prev) => ({ ...prev, min: minValue }));
  };

  const handleMaxAgeChange = (e) => {
    const maxValue = Math.max(Number(e.target.value), ageRange.min + 1);
    setAgeRange((prev) => ({ ...prev, max: maxValue }));
  };

  return (
    <div style={{ position: 'relative', padding: '30px' }}>
      <label htmlFor="minAge">Minimum Age: {ageRange.min}</label>
      <input
        type="range"
        id="minAge"
        min="18"
        max="99"
        value={ageRange.min}
        onChange={handleMinAgeChange}
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          zIndex: '2', // Ensure this slider is on top
        }}
      />
      <label htmlFor="maxAge" style={{ position: 'absolute', right: 0, top: '0px', zIndex: '1' }}>
        Maximum Age: {ageRange.max}
      </label>
      <input
        type="range"
        id="maxAge"
        min="18"
        max="99"
        value={ageRange.max}
        onChange={handleMaxAgeChange}
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          transform: 'rotate(180deg)', // Flip the max range slider
          zIndex: '1', // Ensure this slider is below the min slider
        }}
      />
    </div>
  );
};

