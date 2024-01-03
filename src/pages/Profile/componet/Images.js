import React, { useState } from "react";
import "../style/Images.css";

const Images = ({ setFieldValue}) => {
  const [selectedImage, setSelectedImage] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);

  const handleImageChange = (e) => {
    // Assuming imagePreview and selectedImage are part of your component's state
    if (imagePreview.length >= 3) return;

    const files = [...e.target.files];
    if (files.length > 0) {
      // Update the state with the new files, adding to any previously selected files
      setSelectedImage((prevImages) => [...prevImages, ...files]);

      // Update Formik state
      setFieldValue("image", [...selectedImage, ...files]);

      // Create a preview for each file
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview((oldArray) => [...oldArray, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    }
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

        {imagePreview.length > 0 && (
          <div className="image-preview-container">
            {imagePreview.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`Selected profile ${index + 1}`}
                className="profile-img-preview"
              />
            ))}
          </div>
        )}
        {/* TODO how to check in front end the size of the uploaded images */}
        <p className="file-type-info">
          Accepted file type: .png. Less than 1MB
        </p>
      </div>
    </>
  );
};

export default Images;
