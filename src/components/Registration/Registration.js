import React, { useState } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import "../../styles/register.css";


const MyRadio = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "radio" });

  return (
    <>
      <label className="radio">
        <input {...field} {...props} type="radio" />
        <span>{children}</span>
      </label>
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const MyTextInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <input
        className="text-input"
        {...field}
        {...props}
        type={props.type === "password" && showPassword ? "text" : props.type}
      />
      {props.type === "password" && (
        <span className="toggle-password" onClick={handleTogglePassword}>
          {showPassword ? "Hide" : "Show"}
        </span>
      )}
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};

const Registration = (props) => {
  
  return (
    <>
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          birthday: "",
          gender: "",
          search: "",
          hobbies: {},
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
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <div className="formik-container">
          <button className="close" onClick={props.onClick}>
            &times;
          </button>
          <div className="formik-content">
            <h2>ChatSpace</h2>
            <h3>Create an account</h3>
            <p>We need informations to help you to found your Matcha</p>
            <Form autoComplete="off">
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
                <div className="gender">
                  <h4>Your gender :</h4>
                  <MyRadio name="userGender" value="man">
                    Man
                  </MyRadio>
                  <MyRadio name="userGender" value="woman">
                    Woman
                  </MyRadio>
                </div>
                
              </div>
              <input className="btn-login" type="submit" value="Register"></input>
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default Registration;
