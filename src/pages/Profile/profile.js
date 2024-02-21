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

//Display an Error Message on the Same Page 
//Redirect to an Error Page
//Retry Logic // in the case of the network error


const Profile = () => {
  const [errorSUB, setErrorSUB] = useState(null);
  const [errorGET, setErrorGET] = useState(null);
  const [isFetchingComplete, setIsFetchingComplete] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
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

  //this use effect to get the data fromm the server when the componet first load
  //TODO :checking for specific status codes then asing it an error message
  useEffect(() => {
    //setIsFetchingComplete(true);
    const fetchProfileData = async () => {
      try {
        // Retrieve the token from localStorage

        const token = localStorage.getItem("accessToken");

        // Only proceed if the token exists
        if (token) {
          // Set a timeout duration (e.g., 5000 milliseconds)
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
          console.log("the response data", response.data);

          // Since we are here, it means fetchPromise resolved before timeoutPromise
          //setProfileData(response.data);
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
        } else {
          setErrorGET("No access token available.");
        }
      } catch (err) {
        setIsFetchingComplete(false); // Also set to true if there's an error

        if (err.message === "Request timed out") {
          setErrorGET("Timeout: The request took too long to respond.");
        } else if (err.response) {
          // Error response from server, you can check for specific status codes here
          setErrorGET("Server Error");
        } else if (err.request) {
          // The request was made but no response was received
          setErrorGET("Network Error");
        } else {
          // Something else happened in setting up the request
          setErrorGET("Error: An unexpected error occurred.");
        }
      }
    };

    fetchProfileData();
  }, []);

  //this function submit the inputs value to the endpoint
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

    console.log("the request ", values);

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

  if (isFetchingComplete === false) {
    if (
      errorGET === "Timeout: The request took too long to respond." ||
      errorGET === "Network Error"
    ) {
      return <ErrorComp />;
      // Code to display the modal
      // You can also pass errorGET as a prop to the Modal for displaying the message
    } else if (errorGET === "Server Error") {
      
      // console.log("Server Error");
      // Redirect to the login page
      //history.push('/login');
      
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
