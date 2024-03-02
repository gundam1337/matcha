import React, { useState, useEffect } from 'react';

const Info = ({ setFieldValue, errors, touched, initialValues }) => {

  // const toYYYYMMDD = (isoString) => {
  //   if (isoString) {
  //     const date = new Date(isoString);
  //     const year = date.getFullYear();
  //     const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //     const day = date.getDate().toString().padStart(2, '0');
  //     return `${year}-${month}-${day}`;
  //   }
  //   return '';
  // };

  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    birthday: ''
  });

  // useEffect(() => {
  //   if (initialValues) {
  //     setInfo(prevState => ({
  //       ...prevState,
  //       ...initialValues,
  //       birthday: initialValues.birthday ? toYYYYMMDD(initialValues.birthday) : prevState.birthday
  //     }));
  //   }
  // }, [initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(name, value);
    // setInfo(prevState => ({
    //   ...prevState,
    //   [name.split('.')[1]]: value
    // }));
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
