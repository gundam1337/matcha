//NOTE  : send the user to the home page after finshing the profile setting up
//NOTE  : at the end of the cycle send token
const User = require("../../models/user");
const Yup = require("yup");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // Max file size in bytes (e.g., 5MB)
const admin = require("firebase-admin");
const serviceAccount = require("../../storage/matcha-406014-firebase-adminsdk-fnp82-8517b73387.json");

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
  image: Yup.array().of(
    Yup.mixed()
      .test("fileSize", "File too large", (value) => {
        //console.log("Received file MIME type:", value);
        return value && value.size <= MAX_FILE_SIZE;
      })
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
  // filename: function(req, file, cb) {
  //     // Generate a unique filename with the original file extension
  //     const uniqueFilename = uuidv4() + file.originalname;
  //     cb(null, uniqueFilename);
  // }
});

//Initialize multer with the custom storage engine
const upload = multer({ storage: storage });

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

    // Continue with your logic if validation is successful
    next();
  } catch (err) {
    console.error("Validation error:", err);
    res.status(400).send(err.errors);
  }
};

//NOTE : UPLOAD the files into fire base
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "matcha-406014.appspot.com", // replace with your Firebase Storage bucket name
});

const bucket = admin.storage().bucket();

const uploadToFirebaseStorage = (req, res, next) => {
  if (!req.files) {
    res.status(500).json({ error: "No files to upload." });
    return;
  }

  const files = req.files;
  //DONE  : change the name of the image here
  let fileUploads = files.map((file) => {
    const blob = bucket.file(uuidv4() + file.originalname);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      blobStream.on("error", (error) => reject(error));

      blobStream.on("finish", () => {
        // The public URL can be used to directly access the file via HTTP.
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      });

      blobStream.end(file.buffer);
    });
  });

  Promise.all(fileUploads)
    .then((publicUrls) => {
      // Add the URLs to the request so they can be used in subsequent middleware or response
      req.files.firebaseUrls = publicUrls;
      next();
    })
    .catch((error) => {
      next(error);
    });
};

//FIXME : the image are "seen" in the firbase

//NOTE  : store the reference in MongoDB Save the URL/reference of the image in your MongoDB database, not the image itself.
//TODO : add the the field the the profile is set up
const setProfile = async (req, res, next) => {
  try {
    var userInfo = req.body;
    var newUser = new User({
      firstName: userInfo.info.firstName,
      lastName: userInfo.info.lastName,
      birthdate: userInfo.info.birthdate,
      phoneNumber: userInfo.phoneNumber,
      gender: userInfo.gender,
      location: {
        latitude: userInfo.location.latitude,
        longitude: userInfo.location.longitude,
        city: userInfo.location.city,
        country: userInfo.location.country,
      },
      interests: userInfo.hobbies,
      distance: userInfo.distance,
      targetAge: {
        maxAge: userInfo.targetAge.maxAge,
        minAge: userInfo.targetAge.minAge,
      },
      bio: userInfo.bio,
    });
    await newUser.save();
    res.status(200).send("User added successfully");
  } catch (e) {}

  console.log("Text Fields:", req.body);
  console.log("Files ", req.files);
  console.log("user name ", req.user);

  res.send("FormData received");
};

const profileSetup = [
  upload.any(),
  validate,
  uploadToFirebaseStorage,
  setProfile,
];

module.exports = profileSetup;
