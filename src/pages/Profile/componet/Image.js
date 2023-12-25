import React, { useState } from 'react';
import 'react-phone-number-input/style.css'


const Image = ({ setFieldValue }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);

      // Update Formik state
      setFieldValue("image", file);

      // Create a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview((oldArray) => [...oldArray, reader.result]);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="form-group profile-photo-upload">
        <label htmlFor="profilePhoto">Profile Photo</label>
        <input
          type="file"
          accept="image/png"
          onChange={handleImageChange}
          style={{ display: 'none' }}
          id="profilePhoto"
        />
        <button
          type="button"
          className="btn-upload"
          onClick={() => document.getElementById('profilePhoto').click()}
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

        <p className="file-type-info">
          Accepted file type: .png. Less than 1MB
        </p>
      </div>
    </>
  );
};

export default Image;