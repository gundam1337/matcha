const Info = ({ setFieldValue }) => {
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
        <br />
        <div className="form-row">
        <div>
          <label htmlFor="date">Birthday</label>
          <input 
            type="date" 
            id="info.date" 
            name="birthday" 
            onChange={handleInputChange} 
          />
        </div>
        </div>
      </>
    );
  };
  

export default Info;
