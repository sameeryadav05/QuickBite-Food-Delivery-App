import React, { useContext } from 'react'
import { Authcontext } from '../context/Auth';
import Loader from '../components/Loader';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
  const { isAuthenticated } = useContext(Authcontext);

  if (isAuthenticated === null) {
    return <Loader/>; 
  }

  if (!isAuthenticated) {
    return <Navigate to="/signup" replace />;
  }

  return children;
}

export default PrivateRoute