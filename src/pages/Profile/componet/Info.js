import { useEffect, useState } from "react";


function formatDate(dateString) {
  // Check if dateString is in the expected format
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(dateString)) {
    console.error('Invalid date format:', dateString);
    return '';
  }

  // Extract the YYYY-MM-DD part directly from the dateString
  return dateString.split('T')[0];
}

const Info = ({ setFieldValue, errors, touched,initialValues }) => {

  const [info,setInfo] = useState({firstName: '', lastName: '', birthday: ''});

  useEffect(() => {
    if (initialValues && 'birthday' in initialValues) {
      setInfo({
        ...initialValues,
        birthday: formatDate(initialValues.birthday)
      });
    }
  }, [initialValues]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
            value = {info.firstName}
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
            value = {info.lastName}

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
          value = {info.birthday}

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
