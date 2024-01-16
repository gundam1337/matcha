import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function PhoneNumber({ setFieldValue, errors, touched }) {
  const [phone, setPhone] = useState("");

  const handlePhoneChange = (value) => {
    setPhone(value);
    setFieldValue("phoneNumber", value); // Directly setting the phone number
  };

  return (
    <>
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
    </>
  );
}

export default PhoneNumber;
