import * as Yup from "yup";
import calculateAge from "./CalculateAge";

const nameValidationSchema = Yup.string()
  .matches(
    /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    "Name must contain only letters, apostrophes, hyphens, and spaces"
  )
  .min(2, "Name must be at least 2 characters")
  .max(40, "Name must be less than 40 characters")
  .required(" is required");

export const validationSchema = Yup.object({
  image: Yup.array()
    .of(Yup.mixed().required("Each image is required"))
    .min(2, "You must select at least 2 images"),
  info: Yup.object({
    firstName: nameValidationSchema,
    lastName: nameValidationSchema,
    // birthday: Yup.string()
    //   .required("Birthday is required")
    //   .matches(
    //     /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/(19|20)\d{2}$/,
    //     "Birthday must be in the format mm/dd/yyyy"
    //   )
    //   .test("age", "You must be at least 18 years old", (value) => {
    //     if (value) {
    //       console.log("the value in the verifcation",value)
    //       return calculateAge(value) >= 18;
    //     }
    //     return false;
    //   }),
  }),
  phoneNumber: Yup.string().required("Phone number is required"),
  gender: Yup.string().required("Gender is required"),
  location: Yup.object().shape({
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
  }),
});
