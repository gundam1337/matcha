import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'


const Image = () => {
    return (
      <>
        <div className="form-group profile-photo-upload">
          <label htmlFor="profilePhoto">Profile Photo</label>
          <img
            src="https://images.pexels.com/photos/1037995/pexels-photo-1037995.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            alt="Person's profile"
            className="profile-img"
          ></img>
          <p className="file-type-info">
            Accepted file type: .png. Less than 1MB
          </p>
  
          <button type="button" className="btn-upload">
            Upload
          </button>
        </div>
      </>
    );
  };
  
  const Info = () => {
    return (
      <>
        <div className="form-row">
          <div>
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" />
          </div>
        </div>
        <br/>
        <div className="form-row">
          <div>
            <label htmlFor="date">Birthday</label>
            <input type="date" id="date" name="birthday" />
          </div>
    
        </div>
      </>
    );
  };
  
  function PhoneNumber() {
    // `value` will be the parsed phone number in E.164 format.
    // Example: "+12133734253".
    const [value, setValue] = useState()
    return (
      <PhoneInput
        placeholder="Enter phone number"
        value={value}
        onChange={setValue}/>
    )
  }
  
  const Gender = () => {
    return (
      <div className="gender radio">
        <h4>Your gender :</h4>
        <div>
          <label>
            <input type="radio" name="user-gender" value="man" />
            <span>Man</span>
          </label>
        </div>
  
        <div>
          <label>
            <input type="radio" name="user-gender" value="woman" />
            <span>Woman</span>
          </label>
        </div>
      </div>
    );
  };

  export { Image, Info, PhoneNumber, Gender };
