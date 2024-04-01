import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function PhoneNumber({ setFieldValue, errors, touched,initialValues }) {
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (initialValues) {
      setPhone(initialValues)
    }
  }, [initialValues]);

  const handlePhoneChange = (value) => {
    setPhone(value);
    setFieldValue("phoneNumber", value); // Directly setting the phone number
  };

  return (
    <div className="form-row">
      <h4>Your phone :</h4>
      <PhoneInput
        placeholder="Enter phone number"
        value={phone}
        onChange={handlePhoneChange} // Updated to use the new handler
      />
      {errors.info && touched.info && (
        <>
          <p className="infoError">
            {errors.phoneNumber && "⚠️ "}
            {errors.phoneNumber}
          </p>
        </>
      )}
    </div>
  );
}

export default PhoneNumber;
