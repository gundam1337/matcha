import React, { useState, useEffect } from "react";

const Info = ({ setFieldValue, errors, touched, initialValues }) => {

  const toMMDDYY = (isoString) => {
    if (isoString) {
      const date = new Date(isoString);
      const year = date.getFullYear().toString(); // Get last 2 digits of year
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${month}/${day}/${year}`;
    }
    return "";
  };
  
  const toISOFormat = (dateString) => {
    if (dateString) {
      const parts = dateString.split('/');
      if (parts.length === 3) {
        let year = parseInt(parts[2], 10);
        year += (year < 50 ? 2000 : 1900); // Adjusting YY to YYYY
        const month = parts[0].padStart(2, "0");
        const day = parts[1].padStart(2, "0");
        return `${year}-${month}-${day}`;
      }
    }
    return "";
  };
  
  

  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    birthday: initialValues?.birthday ? toMMDDYY(initialValues.birthday) : "",
    });

  useEffect(() => {
    if (initialValues) {
      setInfo((prevState) => ({
        ...prevState,
        ...initialValues,
      }));
    }
  }, [initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;
  
    if (name === "info.birthday") {
      // Convert the entered MM/DD/YY format to YYYY-MM-DD for internal use
      formattedValue = toISOFormat(value);
    }
  
    setFieldValue(name, formattedValue);
    setInfo((prevState) => ({
      ...prevState,
      [name.split(".")[1]]: name === "info.birthday" ? value : formattedValue,
    }));
  };

  return (
    <>
      <div className="form-row">
        <div>
          <label htmlFor="info.firstName">First Name</label>
          <input
            type="text"
            id="info.firstName"
            name="info.firstName"
            value={info.firstName}
            onChange={handleInputChange}
          />
          {errors.info && touched.info && (
            <>
              <p className="infoError">
                {errors.info.firstName && "⚠️ "}
                {errors.info.firstName}
              </p>
            </>
          )}
        </div>
        <div>
          <label htmlFor="info.lastName">Last Name</label>
          <input
            type="text"
            id="info.lastName"
            name="info.lastName"
            onChange={handleInputChange}
            value={info.lastName}
          />
          {errors.info && touched.info && (
            <>
              <p className="infoError">
                {errors.info.lastName && "⚠️ "}
                {errors.info.lastName}
              </p>
            </>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="info.birthday">Birthday</label>
        <input
          type="date"
          id="info.birthday"
          name="info.birthday"
          onChange={handleInputChange}
          value={info.birthday}
        />
        {errors.info && touched.info && (
          <>
            <p className="infoError">
              {errors.info.birthday && "⚠️ "}
              {errors.info.birthday}
            </p>
          </>
        )}
      </div>
    </>
  );
};

export default Info;
