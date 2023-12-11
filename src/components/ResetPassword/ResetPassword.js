import { Formik, Form, useField } from "formik";
import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
//import "../../styles/register.css";
import MyTextInput from "../Registration/MytextInput";
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";
import EmailSuccessComponent from "../EmailSuccessComponent/EmailSuccessComponent";
//FIXME : fix the css style for this modal

export const ForgotPassword = () => {
  //NOTE : tokens should have a very short validity period (e.g., 10-20 minutes)
  //NOTE : implement measures to detect and block repeated failed attempts or unusual patterns of behavior
  const [submitError, setSubmitError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [is, setIs] = useState(false); // this for the reset password componet
  //TODO : USE THE useEfect to update the state of the reset password

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Sending values:", values);
    setIsLoading(true);
    axios
      .post("http://localhost:3001/forgot-password", values)
      .then((response) => {
        console.log("the response ", response);
      })
      .catch()
      .finally(() => {
        setSubmitting(false);
        setIsLoading(false);
      });
  };

  if (isSent) {
    return <EmailSuccessComponent />; //TODO : make this message depend on the step I am doing
  }

  if (!isLoading && !isSent)
    return (
      <div>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
          })}
          onSubmit={handleSubmit}
        >
          <div className="formik-container">
            {/* <button className="close" onClick={props.onClick}>
              &times;
            </button> */}
            <div className="formik-content">
              <h2>ChatSpace</h2>
              <h3>Account Recovery</h3>
              <p>
                We'll email you a link that will make you reset your password{" "}
              </p>
              <Form autoComplete="on">
                <div className="main-informations">
                  <MyTextInput
                    name="email"
                    type="text"
                    placeholder="Your email"
                  />
                  <input className="btn-login" type="submit" value="Register" />
                  {submitError && (
                    <p>
                      send resetor password failed failed: {submitError.message}
                    </p>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </Formik>
      </div>
    );

  if (isLoading) {
    return <AnimatedLoader />;
  }
};

export const ResetPassword = (props) => {
  const [submitError, setSubmitError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Sending values:", values);
    setIsLoading(true);
    axios
      .post("http://localhost:3001/reset-password", values)
      .then()
      .catch()
      .finally(() => {
        setSubmitting(false);
        setIsLoading(false);
      });
  };

  if (isSent) {
    return <EmailSuccessComponent />; // This is shown when the email has been sent
  }
  if (!isLoading && !isSent)
    return (
      <div>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={Yup.object({
            password: Yup.string()
              .required("Password is required")
              .min(8, "Password must be at least 8 characters")
              .matches(
                /^(?=.*[a-z])(?=.*[0-9])/,
                "Must contain 8 characters and one number"
              ),
            confirmPassword: Yup.string()
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
              <h3>Create an account</h3>
              <p>We need information to help you find your Matcha</p>
              <Form autoComplete="on">
                <div className="main-informations">
                  <MyTextInput
                    name="password"
                    type="password"
                    placeholder="Your password"
                  />

                  <MyTextInput
                    name="confirmPassword"
                    type="password"
                    placeholder="confirm your password"
                  />
                  <input className="btn-login" type="submit" value="Register" />
                  {submitError && (
                    <p>Registration failed: {submitError.message}</p>
                  )}
                </div>
              </Form>
            </div>
          </div>
        </Formik>
      </div>
    );
  if (isLoading) {
    return <AnimatedLoader />;
  }
};

