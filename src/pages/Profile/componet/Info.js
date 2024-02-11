import { useEffect } from "react";

const Info = ({ setFieldValue, errors, touched,initialValues }) => {

  useEffect(()=>{
    if (initialValues && initialValues.length > 0)
    {
      console.log(initialValues)
    }
  },[])
 
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
