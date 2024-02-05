import { createContext, useState } from "react";

export const DataContext = createContext();
export const DataProvider = ({ children }) => {
  const [output, setOutput] = useState(["Welcome to Interim"]);
  return (
    <DataContext.Provider value={{ output, setOutput }}>
      {children}
    </DataContext.Provider>
  );
};
