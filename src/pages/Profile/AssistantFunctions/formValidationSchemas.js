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
    birthday: Yup.date()
      .required("Birthday is required")
      .test(
        "age",
        "You must be at least 18 years old",
        (value) => calculateAge(value) >= 18
      ),
  }),
  phoneNumber: Yup.string().required("Phone number is required"),
  // gender: Yup.string().required("Gender is required"),
  // location: Yup.object().shape({
  //   city: Yup.string().required("City is required"),
  //   country: Yup.string().required("Country is required"),
  // }),
});
