import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

function PhoneNumber({ setFieldValue }) {
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (value) => {
    setPhone(value);
    setFieldValue("phoneNumber", value); // Directly setting the phone number
  };

  return (
    <PhoneInput
      placeholder="Enter phone number"
      value={phone}
      onChange={handlePhoneChange} // Updated to use the new handler
    />
  );
}

export default PhoneNumber;

