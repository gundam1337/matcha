//DONE 0 : check the auth of the user first
//TODO : send the new access token at the end of the cycle 

//NOTE  1: Validate the Image ->File Type Check/File Size Limit/Security Scanning

//NOTE 2 :Store the Image in Google Cloud Storage

//NOTE 3 : send the user to the home page after finshing the profile setting up 
const multer = require("multer");
const path = require("path");

// Set storage engine
const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize upload
const upload = multer().array("image", 3); // Adjust the number '3' as per your requirement

const setProfile = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      if (req.files === undefined || req.files.length === 0) {
        res.status(400).json({ message: "No files selected!" });
      } else {
        // req.files is an array of `images` files
        req.files.forEach(file => {
          console.log("File type:", file.mimetype); // Prints the file type of each file
        });
        res.json({ message: "Files received and types logged" }); // Send a response back to the client
      }
    }
  });
};
module.exports = setProfile;
