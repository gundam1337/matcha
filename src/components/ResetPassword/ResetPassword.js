import { Formik, Form} from "formik";
import { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import MyTextInput from "../Registration/MytextInput";
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";
import queryString from "query-string";
import Cookies from "js-cookie";
import {useAuth} from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";


//TODO : after the submuit commit a reditrection the home page 

const ResetPassword = () => {
  const [submitError, setSubmitError] = useState(null);//this for error 
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthTokenPresent, setIsAuthTokenPresent] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();



  useEffect(() => {
    const queryParams = queryString.parse(window.location.search);
    const tempAuthToken = Cookies.get("tempAuthToken");
    const errorCode = queryParams.code;

    if (tempAuthToken) {
      console.log("Cookie found:", tempAuthToken);
      setIsAuthTokenPresent(true);
    } else {
      console.log("Cookie not found");
      setIsAuthTokenPresent(false);
    }
    
    switch (errorCode) {
      case "400":
        setSubmitError("Bad Request. Please check your input.");
        break;
      case "401":
        setSubmitError("Unauthorized. Please log in again.");
        break;
      case "404":
        setSubmitError("Not Found. The requested resource could not be found.");
        break;
      case "500":
        setSubmitError("Internal Server Error. Please try again later.");
        break;
      default:
        setSubmitError(null);
    }
  }, []);

  const handleSubmit = (values, { setSubmitting }) => {
    setIsLoading(true);

    axios
      .post("http://localhost:3001/reset-password", values,{ withCredentials: true })
      .then( response =>{
        const accessToken = response?.data?.accessToken;

        // Store the access token in localStorage or sessionStorage
        localStorage.setItem("accessToken", accessToken);
        login(accessToken);
        // Use navigate to redirect to the protected route
        navigate("/home");
      })
      .catch()
      .finally(() => {
        setSubmitting(false);
        setIsLoading(false);
      });
  };

  // TODO : add some style to the error message 
  if (submitError) 
    return <div className="formik-container">{submitError}</div>;

  if (isLoading) {
    return <AnimatedLoader />;
  }

  if (!isLoading && !submitError)
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
            .oneOf([Yup.ref("password"), null], "Passwords must match")
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
};

export default ResetPassword;
