import React from "react";
import "./profile.css";
import Location from "./Location";
import { SliderComponent, DualRangeSlider } from "./SliderComponent";
import Hobies from "./Hobies";

// TODO add the phone fild

const Profile = () => {
  return (
    <div style={{ textAlign: "center" }}>
      <div className="settings-box">
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

        <br />
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
        <div className="form-row">
          <div>
            <label htmlFor="date">Birthday</label>
            <input type="date" id="date" name="birthday" />
          </div>
          <div>
            <label htmlFor="phone">Phone Number</label>
            <input type="text" id="phone" name="phone" />
          </div>
        </div>

        <br />
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
        <br />
        <Location></Location>
        <br />
        <Hobies />
        <br />
        <SliderComponent></SliderComponent>
        {/* <DualRangeSlider></DualRangeSlider> */}
        <input className="btn-login" type="submit" value="Submit" />
      </div>
    </div>
  );
};

export default Profile;
