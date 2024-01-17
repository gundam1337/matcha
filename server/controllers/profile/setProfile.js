//DONE 0 : check the auth of the user first

//TODO : send the new access token at the end of the cycle 

//NOTE  1: Validate the Image ->File Type Check/File Size Limit/Security Scanning
//TODO  : verify how many images 

//NOTE 2 :Store the Image in Google Cloud Storage

//NOTE 3 : send the user to the home page after finshing the profile setting up 



// Initialize upload

const setProfile = (req, res, next) => {
  
  console.log('Text Fields:', req.body);

    if (req.files) {
        req.files.forEach(file => {
            console.table('Received file:', file.originalname);
        });
    }

    res.send('FormData received');
};
module.exports = setProfile;



// const Yup = require('yup');
// const calculateAge = require('./calculateAge'); // Import your calculateAge function

// // Define the validation schema (similar to the frontend)
// const validationSchema = Yup.object({
//   image: Yup.array()
//     .of(Yup.mixed().required("Each image is required"))
//     .min(2, "You must select at least 2 images"),
//   info: Yup.object({
//     firstName: nameValidationSchema,
//     lastName: nameValidationSchema,
//     birthday: Yup.date()
//       .required("Birthday is required")
//       .test(
//         "age",
//         "You must be at least 18 years old",
//         (value) => calculateAge(value) >= 18
//       ),
//   }),
//   phoneNumber: Yup.string().required("Phone number is required"),
//   gender: Yup.string().required("Gender is required"),
//   location: Yup.object().shape({
//     city: Yup.string().required("City is required"),
//     country: Yup.string().required("Country is required"),
//   }),
// });

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
