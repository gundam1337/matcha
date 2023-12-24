import React from "react";
import "./profile.css";
import Location from "./Location";
import { SliderComponent, DualRangeSlider } from "./SliderComponent";
import Hobies from "./Hobies";
import Bio from "./Bio";
import 'react-phone-number-input/style.css'
import { Image, Info, PhoneNumber, Gender } from './ProfileComponents';

//TODO  : Multiple Image Uploader 
//TODO  :Add the fromik form to get all inputs 

const Profile = () => {

  return (
    <div style={{ textAlign: "center" }}>
      <div className="settings-box">
        <Image></Image>
        <br />
        <Info></Info>
        <br />
        <PhoneNumber></PhoneNumber>
        <br />
        <Gender></Gender>
        <br />
        <Location></Location>
        <br />
        <Hobies />
        <br />
        <SliderComponent></SliderComponent>
        <br />
        <DualRangeSlider></DualRangeSlider>
        <br />
        <Bio></Bio>
        <input className="btn-login" type="submit" value="Submit" />
      </div>
    </div>
  );
};

export default Profile;
