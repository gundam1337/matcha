import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";


import "./profile.css";
import Image from "./componet/Image";
import Location from "./Location";
import { SliderComponent, DualRangeSlider } from "./SliderComponent";
import Hobies from "./Hobies";
import Bio from "./Bio";
import "react-phone-number-input/style.css";
import {Info, PhoneNumber, Gender } from "./ProfileComponents";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [submitError, setSubmitError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFogoten, setIsForgten] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("image", values.image);

    axios
      .post("YOUR_ENDPOINT_URL", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Handle response here
        console.log(response);
      })
      .catch((error) => {
        // Handle error here
        console.error(error);
      });
  };

  return (
    <>
      <Formik
        initialValues={{
          image: null,
        }}
        validationSchema={Yup.object({
          image: Yup.mixed().required("An image is required"),
        })}
        onSubmit={handleSubmit}
      >
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
            <input className="btn-login" type="submit" value="skip" />
          </div>
        </div>
      </Formik>
    </>
  );
};

export default Profile;
