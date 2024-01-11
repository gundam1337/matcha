import React, { useState } from "react";
import "../style/Images.css";

//DONE : style the buton, make a the bottom of the picture
//TODO : access to the error box and put error message in it


const Images = ({ setFieldValue }) => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [error, setError] = useState([]);




  const validateImages = (files) => {
    let errors = [];
    if (files.length > 2) {
      errors.push("You can only upload up to 2 images.");
    }
  
    files.forEach(file => {
      // if (!file.type.includes("image/png")) {
      //   errors.push("Only PNG images are accepted.");
      // }
      if (file.size > 2000000) { // 2MB in bytes
        errors.push("File size must be less than 2MB.");
      }
    });
  
    setError(errors);
    return errors.length === 0;
  };
  

  const handleImageChange = (e) => {
    const filesFromInput = Array.from(e.target.files);
    const combinedFiles = [...selectedImage, ...filesFromInput];
  
    // Validate the combined files
    const allValid = validateImages(combinedFiles);
    if (!allValid) {
      return; // Stop further processing if validation fails
    }
  
    // Clear any previously selected images if you want to replace them
    // setSelectedImage([]);
  
    // Read each file and update the state with the preview
    combinedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage((oldArray) => [...oldArray, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  
    // Optionally, update the form field value
    setFieldValue('profilePhoto', combinedFiles);
  };
  

  // const handleImageChange = (e) => {
  //   const newFiles = [...e.target.files]; 
  //   const combinedFiles = [...selectedImage, ...newFiles];

    
  
  //   // First, validate the combined files
  //   validateImages(combinedFiles);
  //   console.log("combined files ",combinedFiles)
  //   console.log("error",error)
  
  //   // Check for errors after validation
  //   if (!error) {
  //     // Update the state with the new set of files
  //     setSelectedImage(combinedFiles);
  //     setFieldValue("image", combinedFiles);
  
  //     // Create a preview for each file
  //     combinedFiles.forEach((file) => {
  //       const reader = new FileReader();
  //       reader.onloadend = () => {
  //         // Update the state with the preview
  //         setSelectedImage((oldArray) => [...oldArray, reader.result]);
  //       };
  //       reader.readAsDataURL(file);
  //     });
  //   }
  // };
  

  // const handleDeleteImage = (imageIndex) => {
  //   const newSelectedImages = selectedImage.filter(
  //     (_, index) => index !== imageIndex
  //   );

  //   document.getElementById("profilePhoto").value = '';
  //   setSelectedImage(newSelectedImages);
  //   if (!error)
  //     setFieldValue("image",newSelectedImages);
    
  // };
  const handleDeleteImage = (imageIndex) => {
    const updatedImages = selectedImage.filter((_, index) => index !== imageIndex);
    setSelectedImage(updatedImages);
    // If you need to update the form field value as well
    const files = selectedImage.map(img => {
      return new File([img], "filename.png", { type: "image/png" });
    });
    document.getElementById("profilePhoto").value = ''
    setFieldValue('profilePhoto', files.filter((_, index) => index !== imageIndex));
  };
  

  //DONE :add a button that can delet a photo

  return (
    <>
      <div className="form-group profile-photo-upload">
        <label htmlFor="profilePhoto">Profile Photo</label>
        <input
          type="file"
          multiple
          accept="image/png"
          onChange={handleImageChange}
          style={{ display: "none" }}
          id="profilePhoto"
        />
        <button
          type="button"
          className="btn-upload"
          onClick={() => document.getElementById("profilePhoto").click()}
        >
          Upload
        </button>

        {(selectedImage.length >= 0) & (error.length === 0) && (
          <div className="image-preview-container">
            {selectedImage.map((imgSrc, index) => (
              <div key={index} className="image-container">
                <img
                  src={imgSrc}
                  alt={`Selected item ${index + 1}`}
                  className="profile-img-preview"
                />
                <button
                  onClick={() => handleDeleteImage(index)}
                  className="delete-button"
                  type="button"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        )}
        <p className="file-type-info">
          Accepted file type: .png. Less than 2MB
        </p>

        {error && error.length > 0 && (
          <div className="errorImage-messages">
            {error.map((errorMsg, index) => (
              <p key={index} className="errorImage">
                {errorMsg}
              </p>
            ))}
          </div>
        )}

        {/* {touched.image && errors.image && (
          <div className="errorImage-messages">{errors.image}</div>
        )} */}
      </div>
    </>
  );
};

export default Images;
