import React, {useState} from "react";
import { Formik, Form} from "formik";
import axios from 'axios';
import * as Yup from "yup";
import MyTextInput from "../Registration/MytextInput";
import "../../styles/login.css";

const Login = (props) => {
  const [submitError, setSubmitError] = useState(null);
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
            .required("Passwor is required")
         ,
        })}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          axios.post('http://localhost:3001/login', values)
              .then(response => {
                  console.log(response);
                  // Handle response accordingly
              })
              .catch(error => {
                  console.error(error);
                  // Handle error accordingly
              })
              .finally(() => {
                  setSubmitting(false);
              });
      }}
      >
        <div className="formik-container">
          <button className="close" onClick={props.onClick}>
            &times;
          </button>
          <div className="formik-content">
            <h2>ChatSpace</h2>
            <h3>Login</h3>
            <p>Please enter your name and your password </p>
            <Form autoComplete="off">
              <div className="main-informations">
                <MyTextInput 
                  name="name" 
                  type="text" 
                  placeholder="your name" />
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
                {submitError && <p>Registration failed: {submitError.message}</p>}
              </div>
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default Login;
