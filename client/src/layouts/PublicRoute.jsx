import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { Authcontext } from '../context/Auth';
import Loader from '../components/Loader';

const PublicRoute = ({children}) => {
  const { isAuthenticated } = useContext(Authcontext);

  if (isAuthenticated === null) {
    return <Loader/>
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;  
  }

  return children;
}

export default PublicRoute