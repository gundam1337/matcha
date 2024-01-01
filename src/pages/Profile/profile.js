import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import "./profile.css";
import Images from "./componet/Images";
import Location from "./componet/Location";
import { SliderComponent, DualRangeSlider } from "./componet/SliderComponent";
import Hobies from "./Hobies";
import Bio from "./componet/Bio";
import "react-phone-number-input/style.css";
import { Info, PhoneNumber, Gender } from "./ProfileComponents";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [submitError, setSubmitError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("image", values.image);
    console.log("value is : ", values.image);
    axios
      .post("http://localhost:3001/profile", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
          "x-access-token": localStorage.getItem("accessToken"),
        },
      })

      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Formik
        initialValues={{
          image: null, //3 images
          info: [], // name
          phoneNumber: "",
          gender: "",
          location: "",
          hobbies: [],
        }}
        validationSchema={Yup.object({
          image: Yup.mixed().required("An image is required"),
        })}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div style={{ textAlign: "center" }}>
              <div className="settings-box">
                <Field
                  name="image"
                  component={Images}
                  setFieldValue={setFieldValue}
                />
                <br />
                <Field
                  name="Info"
                  component={Info}
                  setFieldValue={setFieldValue}
                />
                <br />
                <Field
                  name="PhoneNumber"
                  component={PhoneNumber}
                  setFieldValue={setFieldValue}
                />
                <br />
                <Field
                  name="Gender"
                  component={Gender}
                  setFieldValue={setFieldValue}
                />
                <br />
                <Field
                  name="Location"
                  component={Location}
                  setFieldValue={setFieldValue}
                />
                <br />
                <Field
                  name="Hobies"
                  component={Hobies}
                  setFieldValue={setFieldValue}
                />
                <br />
                <Field
                  name="SliderComponent"
                  component={SliderComponent}
                  setFieldValue={setFieldValue}
                />
                <br />
                <Field
                  name="DualRangeSlider"
                  component={DualRangeSlider}
                  setFieldValue={setFieldValue}
                />
                <br />
                <Field
                  name="Bio"
                  component={Bio}
                  setFieldValue={setFieldValue}
                />
                <div>
                  <input className="btn-login" type="submit" value="Submit" />
                  <input className="btn-login" type="submit" value="skip" />
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Profile;
