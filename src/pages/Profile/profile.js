import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

import "./profile.css";

import Images from "./componet/Images";
import Info from "./componet/Info";
import PhoneNumber from "./componet/phoneNumber";
import Gender from "./componet/Gender";
import Location from "./componet/Location";
import Hobies from "./componet/Hobies";
import { SliderComponent, DualRangeSlider } from "./componet/SliderComponent";

import Bio from "./componet/Bio";

import { useNavigate } from "react-router-dom";
import AnimatedLoader from "../../components/AnimatedLoader/AnimatedLoader";

const Profile = () => {
  const [submitError, setSubmitError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (values) => {
    const formData = new FormData();
    values.image.forEach((file) => {
      formData.append("image", file);
    });
    formData.append("info", JSON.stringify(values.info)); // Assuming 'info' is an array or object
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("gender", values.gender);
    formData.append("location", values.location);
    formData.append("hobbies", JSON.stringify(values.hobbies)); //
    console.log("Formik value ",values)
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
      })
      .finally(() => {
        //setIsLoading(true);
      });
  };
  if (!isLoading)
    return (
      <>
        <Formik
          initialValues={{
            image: null, //DONE
            info: {       //DONE
              firstName: "",
              lastName: "",
              birthday: "",
            },
            phoneNumber: "", //DONE
            gender: "",
            location: {
              latitude : "",
              longitude : "",
              city : "",
              country : "",
              
            },
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
  else {
    return <AnimatedLoader />;
  }
};

export default Profile;
