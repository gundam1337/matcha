import React, { useState, useEffect } from "react";
import "../style/Images.css";

const Images = ({ setFieldValue, touched, errors }) => {
  const [selectedImage, setSelectedImage] = useState([]); // this is for displaying
  const [error, setError] = useState([]);
  const [images, setImages] = useState([]); // this is for the sending

  //NOTE : this is working
  useEffect(() => {
    setFieldValue("image", images);
  }, [images]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    setImages((prevImages) => [...prevImages, ...files]);

    files.forEach((file) => {
      if (selectedImage.length < 2) {
        const blobUrl = URL.createObjectURL(file);
        setSelectedImage((oldArray) => [...oldArray, blobUrl]);
      }
    });
  };

  // function validateFile(file) {
  //   const validFileTypes = ["image/png", "image/jpeg"];
  //   const maxFileSize = 2 * 1024 * 1024; // 5 megabytes in bytes

  //   if (!validFileTypes.includes(file.type)) {
  //     alert(`Invalid file type: ${file.name}. Only PNG and JPEG are allowed.`);
  //     return false;
  //   }

  //   if (file.size > maxFileSize) {
  //     alert(`File too large: ${file.name}. Size limit is 5MB.`);
  //     return false;
  //   }

  //   return true;
  // }

  // const handleImageChange = (e) => {
  //   const files = Array.from(e.target.files);

  //   const validFiles = files.filter((file) => validateFile(file));

  //   setImages((prevImages) => [...prevImages, ...validFiles]);

  //   validFiles.forEach((file) => {
  //     if (selectedImage.length < 2) {
  //       const blobUrl = URL.createObjectURL(file);
  //       setSelectedImage((oldArray) => [...oldArray, blobUrl]);
  //     }
  //   });
  // };

  const handleDeleteImage = (imageIndex) => {
    const updatedselectedImage = selectedImage.filter(
      (_, index) => index !== imageIndex
    );

    const updatedImages = images.filter((_, index) => index !== imageIndex);
    setSelectedImage(updatedselectedImage);
    setImages(updatedImages);
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

  return (
    <>
      <div className="form-group profile-photo-upload">
        <p className="file-type-info">upload two image only</p>

        <input
          type="file"
          multiple
          accept="image/png"
          onChange={handleImageChange}
          style={{ display: "none" }}
          disabled={selectedImage.length >= 2}
          id="profilePhoto"
        />
        <button
          type="button"
          className="btn-upload"
          onClick={() => document.getElementById("profilePhoto").click()}
        >
          Upload
        </button>
        <div>
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
        </div>
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
