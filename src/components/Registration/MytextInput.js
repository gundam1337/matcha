import {useField } from "formik";
import React, { useState } from "react";

const MyTextInput = ({ ...props }) => {
    const [field, meta] = useField(props);
    const [showPassword, setShowPassword] = useState(false);
  
    const handleTogglePassword = () => {
      setShowPassword(!showPassword);
    };
  
    const toggleStyle = {
      position: 'absolute',
      bottom: '-20px',
      right: '0',
      backgroundColor: '#eee',
      padding: '5px',
      borderRadius: '3px',
      cursor: 'pointer',
  };
    return (
      <>
        <input
          className="text-input"
          {...field}
          {...props}
          type={props.type === "password" && showPassword ? "text" : props.type}
        />
        {props.type === "password" && (
          <span className={toggleStyle} onClick={handleTogglePassword}>
            {showPassword ? "Hide" : "Show"}
          </span>
        )}
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };
  
export default MyTextInput;