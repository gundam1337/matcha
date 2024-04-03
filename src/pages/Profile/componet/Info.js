import React, { useState, useEffect } from "react";

const Info = ({ setFieldValue, errors, touched, initialValues }) => {
  
  const [info, setInfo] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
  });

  useEffect(() => {
    if (initialValues) {
      setInfo(initialValues)
    }
  }, [initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log("name =",name,' value',value)
    setFieldValue(name, value);
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
