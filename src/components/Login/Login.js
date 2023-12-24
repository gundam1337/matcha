import React, { useState } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import MyTextInput from "../Registration/MytextInput";
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";
import ForgotPassword from "../ResetPassword/ForgotPassword";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

import "../../styles/common.css";
import "../../styles/login.css";

//DONE : remove the space around the username and the password
const Login = (props) => {
  const [submitError, setSubmitError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFogoten, setIsForgten] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (values, { setSubmitting }) => {
    const trimmedValues = {
      name: values.name.trim(),
      password: values.password.trim(),
    };
    setIsLoading(true);
    axios
      .post("http://localhost:3001/signin", trimmedValues, {
        withCredentials: true,
      })
      .then((response) => {
        const { accessToken, isProfileSetup } = response?.data || {};
        if (!accessToken) {
          throw new Error("Access token not found in the response");
        }
        if (accessToken) {
          localStorage.setItem("accessToken", accessToken);
          login(accessToken);
          navigate(isProfileSetup ? "/home" : "/profile");
        }
      })
      .catch((error) => {
        //TODO : re-foramt the error
        console.log("the error", error.response?.data);
        setSubmitError("server is not working");
      })
      .finally(() => {
        setSubmitting(false);
        setIsLoading(false);
      });
  };

  if (!isLoading && !isFogoten)
    return (
      <>
        <Formik
          initialValues={{
            name: "",
            password: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            password: Yup.string()
              .required("Password is required")
              .min(8, "Password must be at least 8 characters")
              .matches(
                /^(?=.*[a-z])(?=.*[0-9])/,
                "Must contain 8 characters and one number"
              ),
          })}
          onSubmit={handleSubmit}
        >
          <div className="formik-container">
            <button className="close" onClick={props.onClick}>
              &times;
            </button>
            <div className="formik-content">
              <h2>ChatSpace</h2>
              <h3>Login</h3>
              {props.isVerified ? (
                <p>your email is verified ✅</p>
              ) : (
                <p>please enter your informations</p>
              )}
              <Form autoComplete="off">
                <div className="main-informations">
                  <MyTextInput
                    name="name"
                    type="text"
                    placeholder="your username"
                  />
                  <MyTextInput
                    name="password"
                    type="password"
                    placeholder="your password"
                  />
                  <input
                    className="btn-login"
                    type="submit"
                    value="login"
                  ></input>
                  {submitError && (
                    <p>Registration failed: {submitError.message}</p>
                  )}
                  <p
                    onClick={() => {
                      setIsForgten(true);
                    }}
                  >
                    Forget your password ?
                  </p>
                </div>
              </Form>
            </div>
          </div>
        </Formik>
      </>
    );

  if (isLoading) {
    return <AnimatedLoader />;
  }
  if (isFogoten) return <ForgotPassword></ForgotPassword>;
};

export default Login;
