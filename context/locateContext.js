'use client'
import { createContext, useState } from "react";

const locationContext = createContext({});

export const LocationProvider = ({ children }) => {
  const [Address, setAddress] = useState({
    loca: "", 
    locID:""
  });

  return (
    <locationContext.Provider value={{ Address, setAddress }}>
      {children}
    </locationContext.Provider>
  );
};

export default locationContext;
