import { Formik, Form, useField } from "formik";
import { useState } from "react";
import axios from "axios";
import * as Yup from "yup";
//import "../../styles/register.css";
import MyTextInput from "../Registration/MytextInput";
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";
import EmailSuccessComponent from "../EmailSuccessComponent/EmailSuccessComponent";

const ForgotPassword = (props)=>{

}

const ResetPassword = (props) => {
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
              )
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

export default ResetPassword;
