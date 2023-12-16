import { Formik, Form, useField } from "formik";
import { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import MyTextInput from "../Registration/MytextInput";
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";
import queryString from "query-string";


 const ResetPassword = () => {

  const [submitError, setSubmitError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

    // const [isResettingPassword, setIsResettingPassword] = useState(false);

  // useEffect(() => {
  //     const urlParams = new URLSearchParams(window.location.search);
  //     const openReset = urlParams.get('openReset');
  //     const tempAuthToken = Cookies.get('tempAuthToken');

  //     if (openReset === 'true' && tempAuthToken) {
  //         setIsResettingPassword(true);
  //         // Handle the reset password process here
  //         // For example, show a form to enter the new password
  //     }
  // }, []); //to jump to the resetpassword comp
  
  useEffect(() => {
    
    const queryParams = queryString.parse(window.location.search);
     console.log(queryParams)
  }, []);

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



  if (!isLoading)
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
              .oneOf([Yup.ref('password'), null], 'Passwords must match')
              .min(8, "Password must be at least 8 characters")
              .matches(
                /^(?=.*[a-z])(?=.*[0-9])/,
                "Must contain 8 characters and one number"
              ),
          })}          
          onSubmit={handleSubmit}
        >
          <div className="formik-container">
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


export default ResetPassword;
