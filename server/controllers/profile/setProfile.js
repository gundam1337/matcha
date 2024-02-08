const User = require("../../models/user");
const Yup = require("yup");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const MAX_FILE_SIZE = 5 * 1024 * 1024; // Max file size in bytes (e.g., 5MB)
const urlPattern = /^https:\/\/storage\.googleapis\.com\/matcha-406014\.appspot\.com\/.*/;

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

//this is for the name
const nameValidationSchema = Yup.string()
  .matches(
    /^[A-Za-zÀ-ÖØ-öø-ÿ' -]+$/,
    "Name must contain only letters, apostrophes, hyphens, and spaces"
  )
  .min(2, "Name must be at least 2 characters")
  .max(40, "Name must be less than 40 characters")
  .required(" is required");

const fileSchema = Yup.mixed()
  .test("fileSize", "File size must be less than 2 megabits", (value) => {
    return !value || (value && value.size <= MAX_FILE_SIZE);
  })
  .test("fileType", "Unsupported file format", (value) => {
    if (!value || !value.name) return true;
    const extension = value.name.split(".").pop();
    return extension === "png" || extension === "jpeg";
  });

const urlSchema = Yup.string().matches(
  urlPattern,
  "URL must follow the specified pattern"
);

const elementSchema = Yup.lazy((value) =>
  typeof value === "string" ? urlSchema : fileSchema
);

const validationSchema = Yup.object({
  image: Yup.array()
    .of(elementSchema)
    .length(2, "Array must contain exactly 2 elements"),
  // info: Yup.object({
  //   firstName: nameValidationSchema,
  //   lastName: nameValidationSchema,
  //   birthday: Yup.date()
  //     .required("Birthday is required")
  //     .test(
  //       "age",
  //       "You must be at least 18 years old",
  //       (value) => calculateAge(value) >= 18
  //     ),
  // }),
  // phoneNumber: Yup.string().required("Phone number is required"),
  // gender: Yup.string().required("Gender is required"),
  // location: Yup.object().shape({
  //   city: Yup.string().required("City is required"),
  //   country: Yup.string().required("Country is required"),
  // }),
});

const storage = multer.memoryStorage();

//Initialize multer with the custom storage engine
//will be stored in the memory (RAM) of the server as a buffer
const upload = multer({ storage: storage });

const validate = async (req, res, next) => {
  try {
    // Convert nested JSON strings to objects
    if (req.body.info) req.body.info = JSON.parse(req.body.info);
    if (req.body.location) req.body.location = JSON.parse(req.body.location);
    if (req.body.hobbies) req.body.hobbies = JSON.parse(req.body.hobbies);
    if (req.body.targetAge) req.body.targetAge = JSON.parse(req.body.targetAge);

    // Structure the data as expected by the validation schema
    const uploadedFiles = req.files || [];
    const requestBodyImages =
      req.body && req.body.image
        ? Array.isArray(req.body.image)
          ? req.body.image
          : [req.body.image]
        : [];
    const combinedMedia = [...uploadedFiles, ...requestBodyImages];

    const validMedia = combinedMedia.filter((mediaItem) => mediaItem);

    // Ensure req.body is an object before destructuring
    const { image, ...otherRequestBodyFields } =
      req.body && typeof req.body === "object" ? req.body : {};

    const dataForValidation = {
      image: validMedia, // Use validMedia instead of combinedMedia
      ...otherRequestBodyFields,
    };

    // Validate the structured data

    await validationSchema.validate(dataForValidation);

    req.body.images = dataForValidation.image;

    next();
  } catch (err) {
    res.status(400).send(err.errors);
  }
};

//NOTE : UPLOAD the files into fire base

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "matcha-406014.appspot.com",
});

const bucket = admin.storage().bucket();

//return the Public URLs of files insise folder using the userID(the name of the fodler)
// const getUserURLsFiles = async (userId) => {
//   // return new Promise((resolve, reject) => {
//   //   const userFolderPath = `${userId}/`;
//   //   bucket.getFiles({ prefix: userFolderPath }, (err, files) => {
//   //     if (err) {
//   //       reject(err);
//   //       return;
//   //     }
//   //     const publicUrls = files.map((file) => {
//   //       // Assuming the bucket is configured for public access, construct the URL
//   //       return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
//   //     });
//   //     resolve(publicUrls);
//   //   });
//   // });
//   try {
//     const [files] = await bucket.getFiles({ prefix: `${userId}/` });
//     const urls = files.map(file => {
//       return `https://storage.googleapis.com/${bucket.name}/${file.name}`;
//     });

//     return urls;
//   } catch (error) {
//     console.error('Error retrieving file URLs:', error);
//     return [];
//   }
// };

function extractFilesFromArray(images) {
  const files = [];

  images.forEach((image) => {
    if (
      typeof image === "object" &&
      (image.hasOwnProperty("filename") || image.hasOwnProperty("mimetype"))
    ) {
      files.push(image);
    }
  });
  return files;
}

function extractUrlFromArrays(array1, array2) {
  const filteredArray1 = array1.filter((item) => typeof item === "string");
  const combinedArray = filteredArray1.concat(array2);
  const uniqueArray = [...new Set(combinedArray)];

  return uniqueArray;
}

//File path = File name
function extractFilePathFromUrl(urls) {
  // Check if urls is an array
  if (!Array.isArray(urls)) {
    console.error("Invalid input: Expected an array of URLs.");
    return [];
  }

  return urls.map(url => {
    // Split the URL into parts and extract the file name part
    const urlParts = url.split("/");
    return urlParts[urlParts.length - 1]; // The last part of the URL is the file name
  });
}



//this function upload
async function uploadFilesToFirebase(files, userId) {
  const uploadPromises = files.map(file => {
    const filePath = `${userId}/${file.originalname}`;
    const fileUpload = bucket.file(filePath).createWriteStream();

    return new Promise((resolve, reject) => {
      fileUpload.on('error', (error) => reject(error));
      fileUpload.on('finish', () => resolve());
      fileUpload.end(file.buffer); 
    });
  });

  try {
    await Promise.all(uploadPromises);
    return true;
  } catch (error) {
    console.error("Error uploading files:", error);
    return false;
  }
}

//delet a spicfic file for me the databse
//this function is not working because the structure of the url 
async function deleteFileFromUserFolder(fileToDeleteUrl, userId) {
  try {

    const filePath = `${userId}/${fileToDeleteUrl}`;
    const file = bucket.file(filePath);

    // Check if file exists
    const [exists] = await file.exists();
    if (!exists) {
      console.log(`File not found: ${filePath}`);
      return true;
    }

    // Delete the file
    await file.delete();
    console.log(`File deleted: ${filePath}`);
    return true;
  } catch (error) {
    console.error('Error deleting file:', error);
    return false;
  }
}

async function getUserFilesPublicUrls(userId) {
  try {
    const files = await bucket.getFiles({ prefix: `${userId}/` });
    const urls = await Promise.all(
      files[0].map(async file => {
        const [url] = await file.getSignedUrl({
          action: 'read',
          expires: '03-09-2491' // Use a far future date for public URLs
        });
        return url;
      })
    );

    return urls;
  } catch (error) {
    console.error('Error retrieving file URLs:', error);
    return [];
  }
}

//this is the main function
const uploadToFirebaseStorage = async (req, res, next) => {
  // Validate inputs
  if (!req.userID || !req.body.images) {
    return res.status(400).send({ error: "Invalid input parameters" });
  }

  const userID = req.userID;
  const receivedImages = req.body.images;

  let existingFiles;

  try {
    // Step 1: Retrieve existing files
    existingFiles = await getUserFilesPublicUrls(userID);

    // Step 2: Remove the duplicated URLs
    const filesToDelete = extractUrlFromArrays(receivedImages, existingFiles);

    // Step 3: Get the name of the file to delete
    const fileNamesToDelete = extractFilePathFromUrl(filesToDelete);
    console.log("file Names To Delete",fileNamesToDelete)
    if ((!fileNamesToDelete || fileNamesToDelete.length === 0) &&  (existingFiles && existingFiles.length >0)) {
      console.error("No files to delet");
      return next();
    }
    // Step 4: Delete the files from the database
    const isDeleted = await deleteFileFromUserFolder(fileNamesToDelete);
    if (isDeleted === false) {
      return res.status(500).send({ error: "Something went wrong in our storage" });
    }

    // Step 5: Get the files to update
    const filesToUpdate = extractFilesFromArray(receivedImages);
    if (!filesToUpdate || filesToUpdate.length === 0) {
      console.error("No files to upload");
      return next();
    }

    // Step 6: Upload the files
    console.log("file to upload",filesToUpdate)
    console.log("the user ID ",userID)
    const isUpdated = await uploadFilesToFirebase(filesToUpdate, userID);
    if (isUpdated === false) {
      return res.status(500).send({ error: "We can't upload the files" });
    }

    // Continue to the next middleware if everything is successful
    return next();
  } catch (error) {
    console.error("Error in uploadToFirebaseStorage:", error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};


//TODO : send the new access token 
const setProfile = async (req, res, next) => {
  try {
    if (!req.user || !req.user.username || !req.user.email) {
      return res
        .status(400)
        .send({ error: "User information not provided in request" });
    }

    // Retrieve username and email from req.user
    const { username, email } = req.user;
    const userID = req.userID;


    // Look up the user in the database based on username and email
    const user = await User.findOne({
      username: username,
      email: email,
    });
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    const userInfo = req.body;
    const targetGender = req.body.gender === "man" ? "woman" : "man";
    const targetAgeMin = !req.body.targetAge.minAge
      ? 18
      : parseInt(req.body.targetAge.minAge, 10);
    const targetAgeMAX = !req.body.targetAge.maxAge
      ? 18
      : parseInt(req.body.targetAge.maxAge, 10);

    // Update the user's profile
    //TODO create a function that get the urls directly form the storage
    const pulicURLs= await getUserFilesPublicUrls(userID)
    user.profile = {
      ...user.profile, // Keep existing profile fields
      // isProfileSetup: true,
      profilePicture: pulicURLs, // Assuming req.files.firebaseUrls is the correct path
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
      bio: userInfo.bio,
      interests: userInfo.hobbies,
    };

    // Update the user's preferences
    user.preferences = {
      gender: targetGender,
      ageRange: {
        min: targetAgeMin,
        max: targetAgeMAX,
        distance: userInfo.distance,
      },
    };

    // Save the updated user
    await user.save();
    res.status(200).send("User added successfully");
  } catch (error) {
    res.status(500).send({ error: error.message });
  }

  // res.send("FormData received");
};

//NOTE  : at the end of the cycle send token

const getProfile = async (req, res) => {
  try {
    console.log("user", req.user);
    const { username, email } = req.user;

    const user = await User.findOne({ username, email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Assuming that the user schema has a 'profile' field with nested properties
    const { profile } = user;
    const profileData = {
      profilePicture: profile.profilePicture,
      firstName: profile.firstName,
      lastName: profile.lastName,
      birthdate: profile.birthdate,
      phoneNumber: profile.phoneNumber,
      gender: profile.gender,
      location: profile.location
        ? {
            latitude: profile.location.latitude,
            longitude: profile.location.longitude,
            city: profile.location.city,
            country: profile.location.country,
          }
        : undefined,
      bio: profile.bio,
      interests: profile.hobbies, // Assuming hobbies is the correct field name
    };

    res.json(profileData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const profileSetup = [
  upload.any(),
  validate,
  uploadToFirebaseStorage,
  setProfile,
];

module.exports = { profileSetup, getProfile };
