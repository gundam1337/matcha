import React, { useState } from "react";
import "../style/Images.css";

//DONE : style the buton, make a the bottom of the picture
//TODO : access to the error box and put error message in it

const Images = ({ setFieldValue, errors, touched }) => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [error, setError] = useState([]);

  const validateImages = (files) => {
    const validExtensions = ["jpg", "jpeg", "png"]; // Allowed extensions

    const maxSize = 2 * 1024 * 1024;

    let errors = [];

    files.forEach((file) => {
      if (!validExtensions.includes(file.name.split(".").pop().toLowerCase())) {
        errors.push(`${file.name} has an invalid extension.`);
      }
      if (file.size > maxSize) {
        errors.push(`${file.name} is too large.`);
      }
    });

    setError(errors);
    return errors.length ? errors : null;
  };

  const handleImageChange = (e) => {
    if (imagePreview.length >= 2) return;
    const files = [...e.target.files];
    const errorImage = validateImages(files);
    if (files.length > 0) {
      // Update the state with the new files, adding to any previously selected files
      setSelectedImage((prevImages) => [...prevImages, ...files]);

      // Update Formik state
      if (!errorImage) setFieldValue("image", [...selectedImage, ...files]);

      // Create a preview for each file
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview((oldArray) => [...oldArray, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDeleteImage = (imageIndex) => {
    // Filter out the image to be deleted from both selectedImage and imagePreview
    const newSelectedImages = selectedImage.filter(
      (_, index) => index !== imageIndex
    );
    const newImagePreviews = imagePreview.filter(
      (_, index) => index !== imageIndex
    );

    setSelectedImage(newSelectedImages);
    setImagePreview(newImagePreviews);
  };

  //TODO :add a button that can delet a photo

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

        {(imagePreview.length > 0) & (error.length === 0) && (
          <div className="image-preview-container">
            {imagePreview.map((imgSrc, index) => (
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

        {touched.image && errors.image && (
          <div className="errorImage-messages">{errors.image}</div>
        )}
      </div>
    </>
  );
};

export default Images;
