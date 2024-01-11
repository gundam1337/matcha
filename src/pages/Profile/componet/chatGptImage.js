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
      if (!file.type.includes("image/png")) {
        errors.push("Only PNG images are accepted.");
      }
      if (file.size > 2000000) { // 2MB in bytes
        errors.push("File size must be less than 2MB.");
      }
    });
  
    setError(errors);
    return errors.length === 0;
  };
  


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const allValid = validateImages(files);
    if (allValid) {
      const images = files.map(file => URL.createObjectURL(file));
      setSelectedImage(images);
      setFieldValue('profilePhoto', files); // Assuming you want to store the original File objects
    }
  };
  
  

  const handleDeleteImage = (imageIndex) => {
    const updatedImages = selectedImage.filter((_, index) => index !== imageIndex);
    setSelectedImage(updatedImages);
    // If you need to update the form field value as well
    const files = selectedImage.map(img => {
      return new File([img], "filename.png", { type: "image/png" });
    });
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

   
      </div>
    </>
  );
};

export default Images;
