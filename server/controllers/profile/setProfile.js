//NOTE 0 : check the auth of the user first

//NOTE  1: Validate the Image ->File Type Check/File Size Limit/Security Scanning

//NOTE 2 :Store the Image in Google Cloud Storage

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
const upload = multer().single("image"); // 'image' is the name attribute in your frontend form

// Check file type
function checkFileType(file, cb) {
  // Allowed file extensions
  const filetypes = /jpeg|jpg|png|gif/;
  // Check extension
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// Middleware function
const setProfile = (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).json({ message: err });
    } else {
      if (req.file == undefined) {
        res.status(400).json({ message: "No file selected!" });
      } else {
        console.log("File type:", req.file.mimetype); // Prints the file type to the console
        res.json({ message: "File type received and logged" }); // Send a response back to the client
      }
    }
  });
};

module.exports = setProfile;
