import { Formik, Form, useField } from "formik";
import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
import "../../styles/register.css";
import MyTextInput from "./MytextInput";
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";
import EmailSuccessComponent from "../EmailSuccessComponent/EmailSuccessComponent";

const MyRadioGroup = ({ label, name, options, ...props }) => {
  const [field, meta] = useField({ ...props, type: "radio", name });

  return (
    <>
      {options.map((option) => (
        <label key={option.value}>
          <input
            type="radio"
            name={name}
            value={option.value}
            onChange={field.onChange}
            {...props}
          />
          <span>{option.label}</span>
        </label>
      ))}
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

//DONE: add the loading when make the post request
//TODO : make the text inside the modale fit the modal
//TODO : use the awit and the async to make the request (optionnal)
// TODOD : add "the this link is invalid"
//TODOD :  Use the useEffect hook to submit the form data to a server and redirect to the login page
//TODO : add the conection error handler 
const Registration = (props) => {
  const [submitError, setSubmitError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  
  //const [existingUserError, setExistingUserError] = useState(null);
 
  const handleSubmit = (values, { setSubmitting }) => {
    console.log("Sending values:", values);
    setIsLoading(true);

    axios
      .post("http://localhost:3001/register", values)
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
            gender: "",
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
            gender: Yup.string().required("Please select your gender"),
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
                  <div className="gender radio">
                    <h4>Your gender:</h4>
                    <MyRadioGroup
                      name="gender"
                      label="Your gender:"
                      options={[
                        { label: "Man", value: "man" },
                        { label: "Woman", value: "woman" },
                      ]}
                    />
                  </div>
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
