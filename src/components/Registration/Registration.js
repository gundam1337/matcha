import React from "react";
import { Formik, Form, useField, useFormikContext } from "formik";
import * as Yup from "yup";
import "../../styles/register.css";

const MyTextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  // i must created the error css class 
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input" {...field} {...props} />
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
          firstName: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          lastName: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email addresss`")
            .required("Required"),
          acceptedTerms: Yup.boolean()
            .required("Required")
            .oneOf([true], "You must accept the terms and conditions."),
          jobType: Yup.string()
            // specify the set of valid values for job type
            // @see http://bit.ly/yup-mixed-oneOf
            .oneOf(
              ["designer", "development", "product", "other"],
              "Invalid Job Type"
            )
            .required("Required"),
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
            <Form>
              <div className="main-informations">
              <MyTextInput 

                label="First Name"
                name="firstName"
                type="text"
                placeholder="your name"
              />
              </div>
            </Form>
            {/*<form action="" method="POST">
              <h3>Tell us more about yourself</h3>
              <div class="main-informations">
                <input name="name " type="text" placeholder="Name" />
                <input type="email" placeholder="Email" name="mail" />
                <input type="password" placeholder="Password" name="password" />
                <h4>Your birthday :</h4>
                <input type="text" placeholder="MM/DD/YYYY" />
              </div>

              <div class="gender radio">
                <h4>Your gender :</h4>
                <div>
                  <label>
                    <input
                      type="radio"
                      name="user-gender"
                      value="man"
                      checked
                    />
                    <span>Man</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input type="radio" name="user-gender" value="woman" />
                    <span>Woman</span>
                  </label>
                </div>
              </div>

              <h4>You Search</h4>
              <div class="gender radio">
                <div>
                  <label>
                    <input
                      type="radio"
                      name="search-gender"
                      value="man"
                      checked
                    />
                    <span>Man</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input type="radio" name="search-gender" value="woman" />
                    <span>Woman</span>
                  </label>
                </div>
              </div>

              <h4>Your Hobbies :</h4>
              <div class="hobbies radio">
                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="user-hobbies"
                      value="cooking"
                    />
                    <span>Cooking</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input type="checkbox" name="user-hobbies" value="sport" />
                    <span>Sport</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="user-hobbies"
                      value="reading"
                    />
                    <span>Reading</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input type="checkbox" name="user-hobbies" value="music" />
                    <span>Music</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input type="checkbox" name="user-hobbies" value="dance" />
                    <span>Dance</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="user-hobbies"
                      value="astronomy"
                    />
                    <span>Astronomy</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="user-hobibes"
                      value="gardening"
                    />
                    <span>Gardening</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="user-hobbies"
                      value="photography"
                    />
                    <span>Photography</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input type="checkbox" name="user-hobbies" value="travel" />
                    <span>Travel</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input type="checkbox" name="user-hobbies" value="cinema" />
                    <span>Cinema</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="user-hobbies"
                      value="videos-games"
                    />
                    <span>Video-Games</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="user-hobbies"
                      value="drawing"
                    />
                    <span>Drawing</span>
                  </label>
                </div>

                <div>
                  <label>
                    <input
                      type="checkbox"
                      name="user-hobbies"
                      value="animals"
                    />
                    <span>Animals</span>
                  </label>
                </div>
              </div>
              <input class="btn-login" type="submit" value="Register" />
          </form>*/}
          </div>
        </div>
      </Formik>
    </>
  );
};

export default Registration;
