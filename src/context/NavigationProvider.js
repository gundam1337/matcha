import React, { createContext, useState } from 'react';

// Create a Context
const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [selectedMatched, setSelectedMatched] = useState({});

  return (
    <MyContext.Provider value={{ selectedMatched, setSelectedMatched }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
