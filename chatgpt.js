import React, { useState } from "react";
import { Formik} from "formik";
import * as Yup from "yup";
import axios from "axios";
import Image from "./componet/Image";

const Profile = () => {

  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append("image", values.image);

    axios
      .post("YOUR_ENDPOINT_URL", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        // Handle response here
        console.log(response);
      })
      .catch((error) => {
        // Handle error here
        console.error(error);
      });
  };

  return (
    <>
      <Formik
        initialValues={{
          image: null,
        }}
        validationSchema={Yup.object({
          image: Yup.mixed().required("An image is required"),
        })}
        onSubmit={handleSubmit}
      >
            <Image ></Image>
            <input className="btn-login" type="submit" value="Submit" />

      </Formik>
    </>
  );
};
