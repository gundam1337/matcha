//DONE 0 : check the auth of the user first

//DONE : send the new access token at the end of the cycle

//DONE  1: Validate the Image ->File Type Check/File Size Limit/Security Scanning
//DONE  : verify how many images

//TODO : Generate unique filenames for uploaded images to prevent overwriting existing files

//NOTE 2 :Store the Image in Google Cloud Storage

//NOTE 3 : send the user to the home page after finshing the profile setting up

const Yup = require("yup");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path')
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // Max file size in bytes (e.g., 5MB)

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

  //FIXME 
const validationSchema = Yup.object({
  image: Yup.array().of(
    Yup.mixed()
      .test(
        "fileSize",
        "File too large",
        (value) => {
          //console.log("Received file MIME type:", value);
          return value && value.size <= MAX_FILE_SIZE
        }
      )
      .test(
        "fileType",
        "Unsupported file format",
        (value) => value && SUPPORTED_FORMATS.includes(value.mimetype)
      )
  ),
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

const storage = multer.diskStorage({
  // destination: function(req, file, cb) {
  //     cb(null, '../../storage'); // Replace 'uploads/' with your desired upload directory
  // },
  filename: function(req, file, cb) {
      // Generate a unique filename with the original file extension
      const uniqueFilename = uuidv4() + path.extname(file.originalname);
      cb(null, uniqueFilename);
  }
});

//Initialize multer with the custom storage engine
const upload = multer({ storage: storage });
// const upload = multer()

const validate = async (req, res, next) => {
  try {
    // Convert nested JSON strings to objects
    if (req.body.info) req.body.info = JSON.parse(req.body.info);
    if (req.body.location) req.body.location = JSON.parse(req.body.location);
    if (req.body.hobbies) req.body.hobbies = JSON.parse(req.body.hobbies);
    if (req.body.targetAge) req.body.targetAge = JSON.parse(req.body.targetAge);

    // Structure the data as expected by the validation schema
    const dataToValidate = {
      image: req.files,
      ...req.body,
    };

    // Validate the structured data
    await validationSchema.validate(dataToValidate);

    //rename the images 

    // Continue with your logic if validation is successful
    next();
  } catch (err) {
    console.error("Validation error:", err);
    res.status(400).send(err.errors);
  }
};



const setProfile = async (req, res, next) => {


  console.log("Text Fields:", req.body);

  if (req.files) {
    req.files.forEach((file) => {
      console.log("Received file:", file.originalname);
    });
  }

  res.send("FormData received");
};

const profileSetup = [upload.any(),validate, setProfile];

module.exports = profileSetup;
