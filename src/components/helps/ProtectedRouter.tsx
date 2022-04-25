import React from 'react';
import { UserContext } from '../../context/UserContext';
import { Navigate } from 'react-router-dom';

interface ProtectedRouterProps {
  children: any;
}

function ProtectedRouter({ children }:ProtectedRouterProps) {
  const { login } = React.useContext(UserContext);
  return login ? children : <Navigate to="" />;
}

export default ProtectedRouter;
