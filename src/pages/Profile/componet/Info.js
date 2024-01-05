const Info = ({ setFieldValue }) => {
  const handleInputChange = (e) => {
    console.log(e); // Log the entire event object
    const { name, value, type } = e.target;

    setFieldValue(name, value); // Set the field value regardless of the type
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
        </div>
        <div>
          <label htmlFor="info.lastName">Last Name</label>
          <input
            type="text"
            id="info.lastName"
            name="info.lastName"
            onChange={handleInputChange}
          />
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
        </div>
    </>
  );
};

export default Info;
