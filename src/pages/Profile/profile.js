import React, { useState, useEffect } from "react";
import { Formik, Field } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./profile.css";

import Images from "./componet/Images";
import Info from "./componet/Info";
import PhoneNumber from "./componet/phoneNumber";
import Gender from "./componet/Gender";
import Location from "./componet/Location";
import Hobies from "./componet/Hobies";
import { Distance, DualRangeSlider } from "./componet/SliderComponent";
import Bio from "./componet/Bio";
import AnimatedLoader from "../../components/AnimatedLoader/AnimatedLoader";

import { validationSchema } from "./AssistantFunctions/formValidationSchemas";

//TODO 1 : display the already existed data
//TODO 2 : set a limite size to the uploaded images
//DONE 3 : if the connection get cut display a message
//TODO 4 : make the error message more styled 
//TODO 5 : make the style of the loading in the center 

const Profile = () => {
  const [submitError, setSubmitError] = useState(null);
  //use this to push errors
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("accessToken");
  
        // Only proceed if the token exists
        if (token) {
          // Set a timeout duration (e.g., 5000 milliseconds)
          const TIMEOUT = 5000;
  
          // Create a promise that rejects after the timeout duration
          const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error("Request timed out")), TIMEOUT)
          );
  
          // Fetch the profile data
          const fetchPromise = axios.get("http://localhost:3001/profile", {
            withCredentials: true,
            headers: {
              "x-access-token": token,
            },
          });
  
          // Use Promise.race to race between the fetchPromise and the timeoutPromise
          const response = await Promise.race([fetchPromise, timeoutPromise]);
  
          // Since we are here, it means fetchPromise resolved before timeoutPromise
          setProfileData(response.data);
        } else {
          // Handle the case where there is no token
          setError("No access token available.");
          // Additional logic to handle an absent token, like redirecting to login
        }
      } catch (err) {
        // This will catch either an Axios error or a timeout error
        setError(err.message);
      }
    };
  
    fetchProfileData();
  }, []);
  

  if (error) return <div> there is an error</div>;
  if (!profileData) return <AnimatedLoader />;

  //console.log("here is the state",profileData)

  const handleSubmit = (values) => {
    const formData = new FormData();

    values.image.forEach((file) => {
      formData.append("image", file);
    });
    formData.append("info", JSON.stringify(values.info));
    formData.append("phoneNumber", values.phoneNumber);
    formData.append("gender", values.gender);
    formData.append("location", JSON.stringify(values.location));
    formData.append("hobbies", JSON.stringify(values.hobbies));
    formData.append("distance", values.distance);
    formData.append("targetAge", JSON.stringify(values.targetAge));
    formData.append("bio", values.bio);

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
            image: [],
            info: {
              firstName: "",
              lastName: "",
              birthday: "",
            },
            phoneNumber: "",
            gender: "",
            location: {
              latitude: "",
              longitude: "",
              city: "",
              country: "",
            },
            hobbies: [],
            bio: "",
            distance: "",
            targetAge: {
              maxAge: "",
              minAge: "",
            },
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, handleSubmit, values, errors, touched }) => (
            <form onSubmit={handleSubmit}>
              <div style={{ textAlign: "center" }}>
                <div className="settings-box">
                  <Field
                    name="image"
                    component={Images}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                  />
                  <br />
                  <Field
                    name="Info"
                    component={Info}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                  />
                  <br />
                  <Field
                    name="PhoneNumber"
                    component={PhoneNumber}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                  />
                  <br />
                  <Field
                    name="Gender"
                    component={Gender}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                  />
                  <br />
                  <Field
                    name="Location"
                    component={Location}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                  />
                  <br />
                  <Hobies setFieldValue={setFieldValue} values={values} />
                  <br />
                  <Field
                    name="distance"
                    component={Distance}
                    setFieldValue={setFieldValue}
                  />
                  <br />
                  <Field
                    name="targetAge"
                    component={DualRangeSlider}
                    setFieldValue={setFieldValue}
                  />
                  <br />
                  <Field
                    name="Bio"
                    component={Bio}
                    setFieldValue={setFieldValue}
                  />

                  <input className="btn-login" type="submit" value="Submit" />
                  {/* <input className="btn-login" value="skip" /> */}
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
