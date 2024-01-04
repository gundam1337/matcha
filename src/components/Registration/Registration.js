import { Formik, Form } from "formik";
import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import "../../styles/register.css";
import MyTextInput from "./MytextInput";
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";
import EmailSuccessComponent from "../EmailSuccessComponent/EmailSuccessComponent";

//DONE : remove the space around the username and the password

const Registration = (props) => {
  const [submitError, setSubmitError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    const trimmedValues = {
      name: values.name.trim(),
      email: values.email.trim(),
      password: values.password.trim(),
    };
    setIsLoading(true);
    axios
      .post("http://localhost:3001/register", trimmedValues)
      .then((response) => {
        const { message } = response.data;
        if (message === "Please check your email box") {
          setIsSent(true);
        }
      })
      .catch((error) => {
        let message = "";
        if (error.response && error.response.data) {
          message = error.response.data.message;
        }
        if (message === "Username already exists") {
          console.log("Username already exists");
          setSubmitError({ message: "Username already exists" });
        } else if (message === "Email already exists") {
          setSubmitError({ message: "Email already exists." });
        } else {
          setSubmitError({ message: "Unexpected response from the server." });
        }
      })
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
            name: "",
            email: "",
            password: "",
          }}
          validationSchema={Yup.object({
            name: Yup.string()
              .max(15, "Must be 15 characters or less")
              .required("Required"),
            email: Yup.string()
              .email("Invalid email address")
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
              <h3>Create an account</h3>
              <p>We need information to help you find your Matcha</p>
              <Form autoComplete="on">
                <div className="main-informations">
                  <MyTextInput
                    name="name"
                    type="text"
                    placeholder="Your name"
                    error={submitError?.message}
                  />
                  <MyTextInput
                    name="email"
                    type="text"
                    placeholder="Your email"
                  />
                  <MyTextInput
                    name="password"
                    type="password"
                    placeholder="Your password"
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

export default Registration;
