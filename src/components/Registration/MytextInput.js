import {useField } from "formik";
import React, { useState } from "react";

// MyTextInput Component
const MyTextInput = ({ ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);
  

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div > 
      <input
        {...field}
        {...props}
        type={props.type === "password" && showPassword ? "text" : props.type}
      />
      {props.type === "password" && (
        <div  className="hide-show" 
          onClick={handleTogglePassword}
        >
          {showPassword ? "Hide" : "Show"}
        </div>
      )}
      {meta.touched && meta.error  ? (
        <div className="error">{meta.error}</div>
      ) : null}
       {props.error  ? (
        <div className="error">{props?.error}</div>
      ) : null}
    </div>
  );
};

export default MyTextInput;