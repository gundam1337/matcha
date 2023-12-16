import { Formik, Form, useField } from "formik";
import { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import MyTextInput from "../Registration/MytextInput";
import AnimatedLoader from "../AnimatedLoader/AnimatedLoader";
import EmailSuccessComponent from "../EmailSuccessComponent/EmailSuccessComponent";


//GOAL IS : send a verifcation email
const ForgotPassword = () => {
  const [submitError, setSubmitError] = useState(null); //this is for the inputs error
  const [isLoading, setIsLoading] = useState(false); //this is for loading
  const [isSent, setIsSent] = useState(false); //this is for if the email sent
  const [isSubmited, setIsSubmited] = useState(false); // id the user submet the form
  const [email, setEmail] = useState(""); // State to store the email

  const handleSuccessResponse = (response) => {
    if (response.status === 200) {
      // Email sent successfully
      setIsSent(true);
    }
    // You can handle other success scenarios here if needed
  };

  const handleErrorResponse = (error) => {
    if (!error.response) {
      // Network or other error
      setSubmitError("Network error or server not responding");
      return;
    }

    switch (error.response.status) {
      case 400:
        // Bad request, likely validation error
        setSubmitError("Invalid input or no user found with this email");
        break;
      case 500:
        // Internal Server Error
        setSubmitError("Server error, please try again later");
        break;
      default:
        // Other errors
        setSubmitError("An unexpected error occurred");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/forgot-password",
          { email }
        );
        // Handle successful response here
        handleSuccessResponse(response);
      } catch (error) {
        handleErrorResponse(error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isSubmited) {
      fetchData();
    }
  }, [isSubmited]);

  const handleSubmit = (values, { setSubmitting }) => {
    setEmail(values.email); // Set the email state with the submitted value
    setIsSubmited(true); // Trigger the useEffect
  };

  if (isSent) {
    return <EmailSuccessComponent />; 
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
                  <input
                    className="btn-login"
                    type="submit"
                    value="Send email"
                  />
                  {submitError && (
                    <p>send resetor password failed failed: {submitError}</p>
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

export default ForgotPassword;
