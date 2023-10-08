import { Formik, Form, useField } from "formik";
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


const Registration = (props) => {
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
              </div>
            </Form>
          </div>
        </div>
      </Formik>
    </>
  );
};

export default Registration;
