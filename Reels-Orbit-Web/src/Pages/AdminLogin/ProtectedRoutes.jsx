/* eslint-disable react/prop-types */
import { Navigate } from 'react-router-dom';

function ProtectedRoutes({ isAuthenticated, children }) {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;  
  }

  return children;
}

export default ProtectedRoutes;
