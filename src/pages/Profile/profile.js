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
import ErrorComp from "./componet/Error";

const Profile = () => {
  const [errorSUB, setErrorSUB] = useState(null);
  const [errorGET, setErrorGET] = useState(null);
  const [isFetchingComplete, setIsFetchingComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false); //I should use this
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
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
  });

  //NOTE : this use effect to get the data fromm the server when the componet first load
  const fetchProfileData = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("accessToken");

      // Only proceed if the token exists
      if (token) {
        // Set a timeout duration (e.g.,10000 milliseconds)
        const TIMEOUT = 10000;

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
        setIsFetchingComplete(true);
        setProfileData((prev) => ({
          ...prev,
          image: response.data.profilePicture || [],
          info: {
            firstName: response.data.firstName || "",
            lastName: response.data.lastName || "",
            birthday: response.data.birthdate || "", // Add birthday to the response data if it's available
          },
          phoneNumber: response.data.phoneNumber || "",
          gender: response.data.gender || "",
          location: {
            latitude: response.data.location?.latitude || "",
            longitude: response.data.location?.longitude || "",
            city: response.data.location?.city || "", // Make sure 'city' is provided in the response
            country: response.data.location?.country || "", // Make sure 'country' is provided in the response
          },
          hobbies: response.data.hobbies || [], // Add hobbies to the response data if it's available
          bio: response.data.bio || "",
          distance: response.data.distance || "", // Add distance to the response data if it's available
          targetAge: {
            maxAge: response.data.targetAge?.maxAge || "",
            minAge: response.data.targetAge?.minAge || "",
          },
        }));
        setIsLoading(false);
        //catching the error in that maigh happen in the get request
      } else {
        setErrorGET("No access token available.");
        return;
      }
    } catch (err) {
      setIsFetchingComplete(false); // Set to false in case of an error

      if (err.message === "Request timed out") {
        setErrorGET("Timeout");
      } else if (err.response) {
        // Error response from server, handle different status codes
        const statusCode = err.response.status;
        switch (statusCode) {
          case 404:
            setErrorGET("User Not Found");
            break;
          case 403:
            setErrorGET("Forbidden");
            break;
          case 500:
            setErrorGET("Internal Server Error");
            break;
          // Additional status codes can be handled here
          default:
            setErrorGET(`Server Error`);
        }
      } else if (err.request) {
        // The request was made but no response was received
        setErrorGET("Network Error");
      } else {
        // Something else happened in setting up the request
        setErrorGET("Unexpected Error");
      }
    }
  };

  useEffect(() => {
    //setIsFetchingComplete(true);
    setIsLoading(true);
    fetchProfileData();
  }, []);

  //NOTE : this function submit the inputs value to the endpoint
  const handleSubmit = async (values) => {
    setIsLoading(true);
    setErrorSUB(null); // Reset error state on new submission

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

    try {
      // Check if accessToken cookie is available
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        setErrorSUB("Access token is missing. Please log in again.");
        setIsLoading(false);
        return;
      }
      // Check if refreshToken cookie is available
      // const refreshToken = document.cookie
      //   .split(";")
      //   .find((cookie) => cookie.trim().startsWith("refreshToken="));
      // if (!refreshToken) {
      //   setErrorSUB("Refresh token is missing. Please log in again.");
      //   setIsLoading(false);
      //   return;
      // }
      const response = await axios.post(
        "http://localhost:3001/profile",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
            "x-access-token": accessToken,
          },
        }
      );
      //TODO : update the access token from the user user

      if (response.accessToken) {
        // Update the access token in local storage
        localStorage.setItem('accessToken', response.accessToken);
      }
      navigate("/home")
      //console.log(response);
    } catch (error) {
      if (!error.response) {
        // Network or other error, not a response from the server
        setErrorSUB("An unexpected error occurred");
      } else {
        // Handle specific status codes
        switch (error.response.status) {
          case 400:
            setErrorSUB(
              "Bad Request - The server could not understand the request due to invalid syntax."
            );
            break;
          case 404:
            setErrorSUB(
              "Not Found - The server can not find the requested resource."
            );
            break;
          case 500:
            setErrorSUB(
              "Internal Server Error - The server has encountered a situation it does not know how to handle."
            );
            break;
          default:
            setErrorSUB("An unexpected error occurred");
        }
      }
    } finally {
      setIsLoading(false);
    }
  };


  //NOTE : the rendring
  if (isLoading) return <AnimatedLoader />;
  if (!isFetchingComplete) {
    //console.log("errorGET = ", errorGET);
    const errorActions = {
      Timeout: () => (
        <ErrorComp message={errorGET} onRetry={fetchProfileData} />
      ),
      "Server Error": () => <ErrorComp message={errorGET} />,
      "Internal Server Error": () => <ErrorComp message={errorGET} />,
      "Network Error": () => (
        <ErrorComp message={errorGET} onRetry={fetchProfileData} />
      ),
      "User Not Found": () => navigate("/"),
      Forbidden: () => navigate("/"),
      "Unexpected Error": () => navigate("/"),
    };

    if (errorActions[errorGET]) {
      return errorActions[errorGET]();
    }
    return <AnimatedLoader />;
  } else
    return (
      <>
        <Formik
          initialValues={profileData}
          validationSchema={validationSchema}
          enableReinitialize={true}
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
                    initialValues={values.image}
                  />
                  <br />
                  <Field
                    name="Info"
                    component={Info}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    initialValues={values.info}
                  />
                  <br />
                  <Field
                    name="PhoneNumber"
                    component={PhoneNumber}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    initialValues={values.phoneNumber}
                  />
                  <br />
                  <Field
                    name="Gender"
                    component={Gender}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    initialValues={values.gender}
                  />
                  <br />
                  <Field
                    name="Location"
                    component={Location}
                    setFieldValue={setFieldValue}
                    errors={errors}
                    touched={touched}
                    initialValues={values.location}
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
                </div>
              </div>
            </form>
          )}
        </Formik>
      </>
    );
};

export default Profile;
