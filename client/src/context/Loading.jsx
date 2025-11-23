import { createContext, useState } from "react";
import React from 'react'


export const LoadingContext = createContext(null);



const LoadingProvider = ({children}) => {
    const [loading,setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{loading,setLoading}}>
        {children}
    </LoadingContext.Provider>
  )
}

export default LoadingProvider