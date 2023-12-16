import React, { useState } from "react";
import { Formik, Form } from "formik";
import axios from "axios";
import * as Yup from "yup";
import MyTextInput from "../Registration/MytextInput";
import EmailSuccessComponent from "../EmailSuccessComponent/EmailSuccessComponent";
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";
import ForgotPassword from "../ResetPassword/ForgotPassword"

import "../../styles/common.css";
import "../../styles/login.css";

const Login = (props) => {
  const [submitError, setSubmitError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false)
  const [isFogoten,setIsForgten] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Sending values:", values);
    setIsLoading(true);
    axios
      .post("http://localhost:3001/signin", values, { withCredentials: true })
      .then((response) => {
        console.log("the response ", response);
      })
      .catch((error) => {
        console.log("the error", error.response?.data);
      })
      .finally(() => {
        setSubmitting(false);
        setIsLoading(false);
      });
  };

  if (isSent) {
    return <EmailSuccessComponent />; // This is shown when the email has been sent
  }

  if (!isLoading && !isSent && !isFogoten)
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
                    onClick={()=>{setIsForgten(true)}}>
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
  if (isFogoten)
  return <ForgotPassword></ForgotPassword>
};

export default Login;
