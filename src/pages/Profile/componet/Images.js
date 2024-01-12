import React, { useState , useRef } from "react";
import "../style/Images.css";

//DONE : style the buton, make a the bottom of the picture
//TODO : access to the error box and put error message in it

const Images = ({ setFieldValue }) => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [error, setError] = useState([]);
  const fileInputRef = useRef();


  const validateImages = (files) => {
    let errors = [];
    const totalImages = selectedImage.length + files.length;

    if (totalImages > 2) {
      errors.push("You can only upload up to 2 images.");
    }

    files.forEach((file) => {
      if (!file.type.includes("image/png")) {
        errors.push("Only PNG images are accepted.");
      }
      if (file.size > 2000000) {
        // 2MB in bytes
        errors.push("File size must be less than 2MB.");
      }
    });

    setError(errors);
    return errors.length === 0;
  };

  const handleImageChange = (e) => {
    const filesFromInput = Array.from(e.target.files);


    // const valid = validateImages(filesFromInput);
    //  if (!valid) 
    // //   return;

    setFieldValue('image', filesFromInput);
    
    console.log("files from inputs are ",filesFromInput)    

    filesFromInput.forEach((file) => {
      if (selectedImage.length < 2) {
        // Ensure we don't exceed 2 images
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage((oldArray) => [...oldArray, reader.result]);
          
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDeleteImage = (imageIndex) => {
    const updatedImages = selectedImage.filter(
      (_, index) => index !== imageIndex
    );
    setSelectedImage(updatedImages);
    setFieldValue("image", updatedImages);
    const files = selectedImage.map((img) => {
      return new File([img], "filename.png", { type: "image/png" });
    });
    document.getElementById("profilePhoto").value = "";
    setFieldValue(
      "profilePhoto",
      files.filter((_, index) => index !== imageIndex)
    );
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
          disabled={selectedImage.length >= 2}
          id="profilePhoto"
      

        />
        {/* DONE add a conditionnal rendring here if the user upload more then 2 disply message insted of the uplod button */}
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
