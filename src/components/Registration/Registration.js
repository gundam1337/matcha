import React , {useState} from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import "../../styles/register.css";

const MyTextInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  
  const handleTogglePassword = () => {
    setShowPassword(!showPassword); // Toggle the state value
  };

  return (
    <>
      {/* Conditionally set input type based on showPassword state */}
      <input 
        className="text-input" 
        {...field} 
        {...props} 
        type={props.type === "password" && showPassword ? "text" : props.type}
      />
      {props.type === "password" && (
        <span 
          className="oggle-password"
          onClick={handleTogglePassword}
          // Optionally add aria-label for accessibility
          aria-label="Toggle password visibility"
        >
          {/* Ternary operator to display Show or Hide based on state */}
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
            .min (8, 'Password must be at least 8 characters')
            .matches(/^(?=.*[a-z])(?=.*[0-9])/,
              "Must Contain 8 Characters And One Number"
            )
        })}
        onSubmit={async (values, { setSubmitting }) => {
          await new Promise((r) => setTimeout(r, 500));
          setSubmitting(false);
        }}
      >
        <div class="formik-container">
          <button class="close" onClick={props.onClick}>
            &times;
          </button>
          <div class="formik-content">
            <h2>ChatSpace</h2>
            <h3>Create an account</h3>
            <p>We need informations to help you to found your Matcha</p>
            <Form autocomplete="off">
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
              </div>
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default Registration;
