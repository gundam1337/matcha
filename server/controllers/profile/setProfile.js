//DONE 0 : check the auth of the user first

//DONE : send the new access token at the end of the cycle

//NOTE  1: Validate the Image ->File Type Check/File Size Limit/Security Scanning
//TODO  : verify how many images

//NOTE 2 :Store the Image in Google Cloud Storage

//NOTE 3 : send the user to the home page after finshing the profile setting up

const Yup = require("yup")

function calculateAge(birthday) {
    const today = new Date();
    const birthDate = new Date(birthday);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

const nameValidationSchema = Yup.string()
  .matches(
    /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    "Name must contain only letters, apostrophes, hyphens, and spaces"
  )
  .min(2, "Name must be at least 2 characters")
  .max(40, "Name must be less than 40 characters")
  .required(" is required");


 const validationSchema = Yup.object({
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
  gender: Yup.string().required("Gender is required"),
  location: Yup.object().shape({
    city: Yup.string().required("City is required"),
    country: Yup.string().required("Country is required"),
  }),
});


const validate = async (req, res, next) => {
  try {
    // Validate the request body
    await validationSchema.validate({
      image: req.files,
      ...req.body,
    });

    // Continue with your logic if validation is successful
    if (req.files) {
      req.files.forEach((file) => {
        console.table("Received file:", file.originalname);
      });
    }

    next();
  } catch (err) {
    // Handle validation errors
    console.error(err);
    res.status(400).send("err.errors");
  }
};




const setProfile = async (req, res, next) => {

    res.send("FormData received");
};

const profileSetup = [validate,setProfile];
module.exports = profileSetup;

//
// const calculateAge = require('./calculateAge'); // Import your calculateAge function

// // Define the validation schema (similar to the frontend)

// // Modified setProfile function with validation
// const setProfile = async (req, res, next) => {
//   console.log('Text Fields:', req.body);

//   try {
//     // Validate the request body
//     await validationSchema.validate({
//       image: req.files,
//       ...req.body
//     });

//     // Continue with your logic if validation is successful
//     if (req.files) {
//       req.files.forEach(file => {
//         console.table('Received file:', file.originalname);
//       });
//     }

//     res.send('FormData received');
//   } catch (err) {
//     // Handle validation errors
//     console.error(err);
//     res.status(400).send(err.errors);
//   }
// };

// module.exports = setProfile;

//   console.log('Text Fields:', req.body);

//     if (req.files) {
//         req.files.forEach(file => {
//             console.log('Received file:', file.originalname);
//         });
//     }
