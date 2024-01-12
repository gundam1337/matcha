//DONE 0 : check the auth of the user first

//TODO : send the new access token at the end of the cycle 

//NOTE  1: Validate the Image ->File Type Check/File Size Limit/Security Scanning
//TODO  : verify how many images 

//NOTE 2 :Store the Image in Google Cloud Storage

//NOTE 3 : send the user to the home page after finshing the profile setting up 



// Initialize upload

const setProfile = (req, res, next) => {
  
  console.log('Text Fields:', req.body);
  //console.log('images are :',req.files)

    if (req.files) {
        req.files.forEach(file => {
            console.log('Received file:', file.originalname);
        });
    }

    res.send('FormData received');
};
module.exports = setProfile;
