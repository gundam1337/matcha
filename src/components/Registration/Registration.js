import { Formik, Form, useField } from "formik";
import { useState } from "react";
import axios from 'axios';
import * as Yup from "yup";
import "../../styles/register.css";
import MyTextInput from "./MytextInput";


const MyRadioGroup = ({ label, name, options, ...props }) => {
  const [field, meta] = useField({ ...props, type: "radio", name });

  return (
    <>
      {options.map((option) => (
        <label  key={option.value} >
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

//TODO: add the loading when make the post request 
//TODO: use the side effect 
//TODO : use the awit and the async to make the request (optionnal)
// TODOD : add "the this link is invalid"
//TODOD :  Use the useEffect hook to submit the form data to a server and redirect to the login page
const Registration = (props) => {
  const [submitError, setSubmitError] = useState(null);
  const handleSubmit = (values, { setSubmitting }) => {
    console.log('Sending values:', values);
    axios.post('http://localhost:3001/register', values) //register
      .then(response => {
        console.log('Response:', response);
      })
      .catch(error => {
        console.error('Error:', error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error('Data:', error.response.data);
          console.error('Status:', error.response.status);
          console.error('Headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Request:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Message:', error.message);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  
  
  return (
    <>
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
            .email("Invalid email addresss`")
            .required("Required"),
          password: Yup.string()
            .required("Passwor is required")
            .min(8, "Password must be at least 8 characters")
            .matches(
              /^(?=.*[a-z])(?=.*[0-9])/,
              "Must Contain 8 Characters And One Number"
            ),
          gender: Yup.string()
            .required("Please select your gender"),
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
            <p>We need informations to help you to found your Matcha</p>
            {/*<Form autoComplete="off">*/}
            <Form autoComplete="on">
              <div className="main-informations">
                <MyTextInput name="name" type="text" placeholder="your name" />
                <MyTextInput
                  name="email"
                  type="text"
                  placeholder="your email"
                />
                <MyTextInput
                  name="password"
                  type="password"
                  placeholder="your password"
                />
                <div className="gender radio">
                  <h4>Your gender :</h4>
                  <MyRadioGroup
                    name="gender"
                    label="Your gender:"
                    options={[
                      { label: "Man", value: "man" },
                      { label: "Woman", value: "woman" },
                    ]}
                  />
                </div>
                <input
                  className="btn-login"
                  type="submit"
                  value="Register"
                ></input>
                {submitError && <p>Registration failed: {submitError.message}</p>}
              </div>
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default Registration;
